/* eslint-disable react/display-name */
import React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { RecipePreviewStepTemplate } from "./recipe.preview-step-template"
import { useNavigation } from "@react-navigation/native"
import { Text } from "../../components"
import { HEADER_TITLE } from "../../navigation"

export const RecipePreviewStepScreen = observer(function RecipePreviewStepScreen() {
  const { user, recipeStore } = useStores()
  const navigation = useNavigation()

  navigation.setOptions({
    headerTitle: () => <Text style={HEADER_TITLE} text={recipeStore.recipe.title} />,
  })

  const author = {
    firstname: user.firstname,
    image: {
      uri:
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    },
  }
  return <RecipePreviewStepTemplate author={author} steps={recipeStore.recipe.steps} />
})
