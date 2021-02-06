/* eslint-disable generator-star-spacing */
/* eslint-disable camelcase */
import { Auth, API, graphqlOperation, Storage } from "aws-amplify"
import { flow, getParent, Instance, SnapshotOut, types } from "mobx-state-tree"
import * as queries from "../../graphql/queries"
import * as mutations from "../../graphql/mutations"
import { RecipeModel } from "../recipe/recipe"
import { RootStoreModel } from "../root-store/root-store"

/**
 * Model description here for TypeScript hints.
 */

export const UserModel = types
  .model("User")
  .props({
    username: types.optional(types.string, ""),
    firstname: types.optional(types.string, ""),
    lastname: types.optional(types.string, ""),
    phone_number: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    recipes: types.array(RecipeModel),
    recipe: types.maybe(RecipeModel),
  })
  .views((self) => ({
    get fullName() {
      return `${self.firstname} ${self.lastname}`
    },
    get handleRequest() {
      return getParent<typeof RootStoreModel>(self).request.startRequest
    },
  }))
  .actions((self) => ({
    signIn: flow(function* (username: string, password: string) {
      try {
        const { attributes } = yield self.handleRequest(() => Auth.signIn(username, password))
        self.firstname = attributes.given_name
        self.lastname = attributes.family_name
        self.email = attributes.email
        return self
      } catch (error) {
        throw Error(error)
      }
    }),
    signUp: flow(function* (data) {
      try {
        const { user } = yield self.handleRequest(() => Auth.signUp(data))
        self.username = user.username
      } catch (e) {
        console.error(e)
        throw Error(e)
      }
    }),
    confirmSignUp: flow(function* (code: string) {
      try {
        return yield self.handleRequest(() => Auth.confirmSignUp(self.username, code))
      } catch (e) {
        console.tron.log(e)
        throw Error(e)
      }
    }),
    signOut: flow(function* () {
      try {
        yield Auth.signOut()
        for (const key in self) {
          self[key] = ""
        }
        return Promise.resolve()
      } catch (e) {
        throw Error(e)
      }
    }),
    previewRecipe(recipe) {
      self.recipe = recipe
    },
    createRecipe: flow(function* () {
      try {
        return yield self.handleRequest(
          async function () {
            const getImageUriFileName = (path: string) => path.substring(path.lastIndexOf("/") + 1)

            const fetches = await Promise.all(
              [
                self.recipe.image.uri,
                ...self.recipe.ingredients.map(({ image }) => image.uri),
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
                    image: getImageUriFileName(image.uri),
                    label,
                  })),
                },
              }),
            )
          },
          { error: "Une erreur est survenue", success: "Votre recette à bien été publiée" },
        )
      } catch (e) {
        throw Error(e)
      }
    }),
    // createRecipe: flow(
    //   self.root.request.startRequest(function* () {
    //     const getImageUriFileName = (path: string) => path.substring(path.lastIndexOf("/") + 1)

    //     const fetches = yield Promise.all(
    //       [
    //         self.recipe.image.uri,
    //         ...self.recipe.ingredients.map(({ image }) => image.uri),
    //       ].map((data) => fetch(data)),
    //     )

    //     for (const data of fetches) {
    //       const blob = (yield data.blob()) as { _data: { name: string } }
    //       const fileName = blob._data.name

    //       yield Storage.put(fileName, blob, {
    //         contentType: "image/jpeg",
    //       })
    //     }

    //     const { image, ingredients, time, cookingTime } = self.recipe

    //     return yield API.graphql(
    //       graphqlOperation(mutations.createRecipe, {
    //         input: {
    //           ...self.recipe,
    //           time: time.toISOString(),
    //           cookingTime: cookingTime.toISOString(),
    //           image: getImageUriFileName(image.uri),
    //           ingredients: ingredients.map(({ image, label }) => ({
    //             image: getImageUriFileName(image.uri),
    //             label,
    //           })),
    //         },
    //       }),
    //     )
    //   }),
    // ),
    listRecipes: flow(function* (): any {
      try {
        // const {
        //   data: { listRecipes },
        // } = yield API.graphql(graphqlOperation(queries.listRecipes))
        const response = yield API.graphql(graphqlOperation(queries.listRecipes))

        self.recipes = response.data.listRecipes.items

        return response
        // return Promise.resolve()
      } catch (e) {
        console.log(e)
        throw Error(e)
      }
    }),
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
