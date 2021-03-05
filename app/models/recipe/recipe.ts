import { getParent, Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import * as yup from "yup"
import type { Asserts } from "yup"
import { RootStoreModel } from "../root-store/root-store"
import { Storage, API, graphqlOperation } from "aws-amplify"
import * as mutations from "../../graphql/mutations"
import * as queries from "../../graphql/queries"

export interface IRecipeFieldValues extends Asserts<typeof RecipeSchema> {}

export const RecipeSchema = yup.object({
  title: yup.string().required("Le titre est requis").default(""),
  image: yup
    .object({ uri: yup.string().required() })
    .required("Une photo est requise")
    .default({ uri: "" }),
  description: yup.string().required("La description est requise").default(""),
  numberOfPersons: yup.number().positive().integer().required().default(0),
  time: yup
    .date()
    .min(new Date(60000))
    .max(new Date(24 * 3600 * 1000))
    .required()
    .default(new Date(0)),
  steps: yup
    .array(yup.object({ description: yup.string().required(), trick: yup.string() }))
    .min(2)
    .default([
      { description: "", trick: "" },
      { description: "", trick: "" },
    ]),
  ingredients: yup
    .array(
      yup.object({
        image: yup.string(),
        label: yup.string().required(),
      }),
    )
    .transform((value) => value.filter(({ label }) => label))
    .min(2)
    .required(),
  cookingTime: yup
    .date()
    .min(new Date(60000))
    .max(new Date(24 * 3600 * 1000))
    .nullable()
    .default(null),
  numberOfCalories: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .nullable()
    .default(null),
})

/**
 * Model description here for TypeScript hints.
 */
export const RecipeModel = types.model("RecipeModel", {
  title: types.string,
  description: types.string,
  image: types.model({ uri: types.string }),
  numberOfPersons: types.number,
  time: types.Date,
  ingredients: types.array(types.model({ label: types.string, image: types.string })),
  cookingTime: types.union(types.Date, types.null),
  numberOfCalories: types.union(types.number, types.null),
  steps: types.array(
    types.model({ description: types.string, trick: types.union(types.string, types.null) }),
  ),
})
export const RecipeModelFromAWS = types.model("RecipeModelFromAWS", {
  id: types.string,
  title: types.string,
  description: types.string,
  image: types.string,
  numberOfPersons: types.number,
  time: types.string,
  ingredients: types.array(types.model({ label: types.string, image: types.string })),
  cookingTime: types.union(types.string, types.null),
  numberOfCalories: types.union(types.number, types.null),
  steps: types.array(
    types.model({ description: types.string, trick: types.union(types.string, types.null) }),
  ),
})

export const RecipeStore = types
  .model("RecipeStore", {
    recipe: types.maybe(RecipeModel),
    recipes: types.array(RecipeModelFromAWS),
  })
  .views((self) => ({
    get handleRequest() {
      return getParent<typeof RootStoreModel>(self).request.startRequest
    },
  }))
  .actions((self) => {
    const clearRecipe = () => {
      self.recipe = undefined
    }
    return {
      clearRecipe,
      addRecipe(recipe) {
        self.recipe = recipe
      },
      listRecipes: flow(function* (): any {
        try {
          const response = yield API.graphql(graphqlOperation(queries.listRecipes))
          const recipes = yield Promise.all(
            response.data.listRecipes.items.map(async (recipe) => {
              const ingredientsWithS3Image = await Promise.all(
                recipe.ingredients.map(async (ingredient) => {
                  if (!ingredient.image) {
                    return ingredient
                  }
                  const s3IngredientImage = await Storage.get(ingredient.image)
                  ingredient.image = s3IngredientImage
                  return ingredient
                }),
              )
              const s3Image = await Storage.get(recipe.image)
              recipe.image = s3Image
              recipe.ingredients = ingredientsWithS3Image
              return recipe
            }),
          )

          self.recipes = recipes

          return response
        } catch (e) {
          throw Error(e)
        }
      }),
      createRecipe: flow(function* () {
        try {
          const reponse = yield self.handleRequest(
            async function () {
              const getImageUriFileName = (path: string) =>
                path.substring(path.lastIndexOf("/") + 1)

              const fetches = await Promise.all(
                [
                  self.recipe.image.uri,
                  ...self.recipe.ingredients
                    .filter(({ image }) => !!image)
                    .map(({ image }) => image),
                ].map((data) => fetch(data)),
              )
              for (const data of fetches) {
                const blob = (await data.blob()) as { _data: { name: string } }
                const fileName = blob._data.name

                await Storage.put(fileName, blob, {
                  contentType: "image/jpeg",
                })
              }
              const { image, ingredients, time, cookingTime } = self.recipe

              return await API.graphql(
                graphqlOperation(mutations.createRecipe, {
                  input: {
                    ...self.recipe,
                    time: time.toISOString(),
                    cookingTime: cookingTime.toISOString(),
                    image: getImageUriFileName(image.uri),
                    ingredients: ingredients.map(({ image, label }) => ({
                      image: getImageUriFileName(image),
                      label,
                    })),
                  },
                }),
              )
            },
            { error: "Une erreur est survenue", success: "Votre recette à bien été publiée" },
          )
          // clearRecipe()
          return reponse
        } catch (e) {
          throw Error(e)
        }
      }),
    }
  })

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type RecipeType = Instance<typeof RecipeModel>
export interface Recipe extends RecipeType {}
type RecipeSnapshotType = SnapshotOut<typeof RecipeModel>
export interface RecipeSnapshot extends RecipeSnapshotType {}
