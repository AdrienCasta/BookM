/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRecipeInput = {
  id?: string | null
  title: string
  image: string
  description?: string | null
}

export type ModelRecipeConditionInput = {
  title?: ModelStringInput | null
  image?: ModelStringInput | null
  description?: ModelStringInput | null
  and?: Array<ModelRecipeConditionInput | null> | null
  or?: Array<ModelRecipeConditionInput | null> | null
  not?: ModelRecipeConditionInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type UpdateRecipeInput = {
  id: string
  title?: string | null
  image?: string | null
  description?: string | null
}

export type DeleteRecipeInput = {
  id?: string | null
}

export type ModelRecipeFilterInput = {
  id?: ModelIDInput | null
  title?: ModelStringInput | null
  image?: ModelStringInput | null
  description?: ModelStringInput | null
  and?: Array<ModelRecipeFilterInput | null> | null
  or?: Array<ModelRecipeFilterInput | null> | null
  not?: ModelRecipeFilterInput | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type CreateRecipeMutationVariables = {
  input: CreateRecipeInput
  condition?: ModelRecipeConditionInput | null
}

export type CreateRecipeMutation = {
  createRecipe: {
    __typename: "Recipe"
    id: string
    title: string
    image: string
    description: string | null
    createdAt: string
    updatedAt: string
    owner: string | null
  } | null
}

export type UpdateRecipeMutationVariables = {
  input: UpdateRecipeInput
  condition?: ModelRecipeConditionInput | null
}

export type UpdateRecipeMutation = {
  updateRecipe: {
    __typename: "Recipe"
    id: string
    title: string
    image: string
    description: string | null
    createdAt: string
    updatedAt: string
    owner: string | null
  } | null
}

export type DeleteRecipeMutationVariables = {
  input: DeleteRecipeInput
  condition?: ModelRecipeConditionInput | null
}

export type DeleteRecipeMutation = {
  deleteRecipe: {
    __typename: "Recipe"
    id: string
    title: string
    image: string
    description: string | null
    createdAt: string
    updatedAt: string
    owner: string | null
  } | null
}

export type GetRecipeQueryVariables = {
  id: string
}

export type GetRecipeQuery = {
  getRecipe: {
    __typename: "Recipe"
    id: string
    title: string
    image: string
    description: string | null
    createdAt: string
    updatedAt: string
    owner: string | null
  } | null
}

export type ListRecipesQueryVariables = {
  filter?: ModelRecipeFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListRecipesQuery = {
  listRecipes: {
    __typename: "ModelRecipeConnection"
    items: Array<{
      __typename: "Recipe"
      id: string
      title: string
      image: string
      description: string | null
      createdAt: string
      updatedAt: string
      owner: string | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type OnCreateRecipeSubscriptionVariables = {
  owner: string
}

export type OnCreateRecipeSubscription = {
  onCreateRecipe: {
    __typename: "Recipe"
    id: string
    title: string
    image: string
    description: string | null
    createdAt: string
    updatedAt: string
    owner: string | null
  } | null
}

export type OnUpdateRecipeSubscriptionVariables = {
  owner: string
}

export type OnUpdateRecipeSubscription = {
  onUpdateRecipe: {
    __typename: "Recipe"
    id: string
    title: string
    image: string
    description: string | null
    createdAt: string
    updatedAt: string
    owner: string | null
  } | null
}

export type OnDeleteRecipeSubscriptionVariables = {
  owner: string
}

export type OnDeleteRecipeSubscription = {
  onDeleteRecipe: {
    __typename: "Recipe"
    id: string
    title: string
    image: string
    description: string | null
    createdAt: string
    updatedAt: string
    owner: string | null
  } | null
}
