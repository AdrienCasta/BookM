import { getSnapshot } from "mobx-state-tree"
import { RecipeStore } from "./recipe"

const mockRecipe = {
  numberOfCalories: null,
  cookingTime: null,
  ingredients: [
    {
      label: "",
      image: {
        uri: "test",
      },
    },
  ],
  steps: [
    {
      description: "",
      trick: "",
    },
    {
      description: "",
      trick: "",
    },
  ],
  time: new Date(0),
  numberOfPersons: 0,
  description: "",
  image: {
    uri: "",
  },
  title: "",
}

jest.mock("aws-amplify", () => {
  return {
    API: {
      graphql: jest.fn().mockImplementation(() => {
        return Promise.resolve({
          data: {
            listRecipes: {
              items: [
                { ...mockRecipe, id: 1 },
                { ...mockRecipe, id: 2 },
              ],
            },
          },
        })
      }),
    },
  }
})

test("can be created", () => {
  const instance = RecipeStore.create({})

  expect(instance).toBeTruthy()
})

it("recipe store can add new recipe", () => {
  const recipe = RecipeStore.create({})
  recipe.addRecipe(mockRecipe)
  expect(getSnapshot(recipe)).toMatchSnapshot()
})
it("recipe store can clear recipe", () => {
  const recipe = RecipeStore.create(mockRecipe)
  recipe.createRecipe()
  expect(getSnapshot(recipe)).toMatchSnapshot()
})
it("recipe store can list recipes", () => {
  const recipe = RecipeStore.create(mockRecipe)
  recipe.listRecipes()
  expect(getSnapshot(recipe)).toMatchSnapshot()
})
