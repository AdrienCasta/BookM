import { useNavigation } from "@react-navigation/native"
import React from "react"

import { useStores } from "../../models"
import { RecipePreviewTemplate } from "./recipe.preview-template"

export const RecipePreviewScreen = function RecipePreviewScreen() {
  const { user, recipeStore } = useStores()
  const author = {
    firstname: user.firstname || "Adrien",
    image: {
      uri:
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    },
  }
  const navigation = useNavigation()

  const handleNavigation = () => {
    navigation.navigate("RecipePreviewStepScreen")
  }
  const handleRecipeCreation = () => {
    recipeStore.createRecipe()
  }
  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <RecipePreviewTemplate
      recipe={recipeStore.recipe}
      onCookPress={handleNavigation}
      onPublish={handleRecipeCreation}
      onGoBack={handleGoBack}
      author={author}
    />
  )
}
