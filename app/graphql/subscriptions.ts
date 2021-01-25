/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe($owner: String!) {
    onCreateRecipe(owner: $owner) {
      id
      title
      image
      description
      numberOfPersons
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
      createdAt
      updatedAt
      owner
    }
  }
`
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe($owner: String!) {
    onUpdateRecipe(owner: $owner) {
      id
      title
      image
      description
      numberOfPersons
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
      createdAt
      updatedAt
      owner
    }
  }
`
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe($owner: String!) {
    onDeleteRecipe(owner: $owner) {
      id
      title
      image
      description
      numberOfPersons
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
      createdAt
      updatedAt
      owner
    }
  }
`
