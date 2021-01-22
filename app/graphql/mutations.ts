/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe($input: CreateRecipeInput!, $condition: ModelRecipeConditionInput) {
    createRecipe(input: $input, condition: $condition) {
      id
      title
      image
      description
      createdAt
      updatedAt
      owner
    }
  }
`
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe($input: UpdateRecipeInput!, $condition: ModelRecipeConditionInput) {
    updateRecipe(input: $input, condition: $condition) {
      id
      title
      image
      description
      createdAt
      updatedAt
      owner
    }
  }
`
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe($input: DeleteRecipeInput!, $condition: ModelRecipeConditionInput) {
    deleteRecipe(input: $input, condition: $condition) {
      id
      title
      image
      description
      createdAt
      updatedAt
      owner
    }
  }
`
