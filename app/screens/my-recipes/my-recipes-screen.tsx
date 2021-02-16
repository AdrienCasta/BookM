import React from "react"
import { MyRecipesTemplate } from "./my-recipes-template"
import { useStores } from "../../models"

export const MyRecipesScreen = () => {
  const { recipeStore } = useStores()
  return <MyRecipesTemplate recipes={recipeStore.recipes} onRecipePress={console.log} />
}
