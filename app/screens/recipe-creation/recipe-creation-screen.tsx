import React from "react"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { IRecipeFieldValues } from "../../models/recipe/recipe"
import { useStores } from "../../models"
import { RecipeCreationTemplate } from "./recipe-creation-template"

export const RecipeCreationScreen = observer(function RecipeCreationScreen() {
  const { recipeStore } = useStores()
  const navigation = useNavigation()

  const onSubmit = (recipe: IRecipeFieldValues) => {
    recipeStore.addRecipe(recipe)
    navigation.navigate("RecipePreviewScreen")
  }
  return <RecipeCreationTemplate navigation={navigation} onSubmit={onSubmit} />
})
