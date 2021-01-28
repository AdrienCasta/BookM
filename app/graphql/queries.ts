/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      image
      description
      time
      numberOfPersons
      numberOfCalories
      cookingTime
      step1 {
        description
        trick
      }
      step2 {
        description
        trick
      }
      otherSteps {
        description
        trick
      }
      ingredients {
        image
        label
      }
      createdAt
      updatedAt
      owner
    }
  }
`
export const listRecipes = /* GraphQL */ `
  query ListRecipes($filter: ModelRecipeFilterInput, $limit: Int, $nextToken: String) {
    listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        image
        description
        time
        numberOfPersons
        numberOfCalories
        cookingTime
        step1 {
          description
          trick
        }
        step2 {
          description
          trick
        }
        otherSteps {
          description
          trick
        }
        ingredients {
          image
          label
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`
