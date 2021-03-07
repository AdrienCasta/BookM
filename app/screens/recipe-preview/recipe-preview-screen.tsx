import { useNavigation } from "@react-navigation/native"
import { ViewStyle } from "react-native"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"

import { useStores } from "../../models"
import { RecipePreviewTemplate } from "./recipe.preview-template"
import BookmIcon from "../../../assets/bookm.svg"
import { Box, Screen } from "../../components"
import { color } from "../../theme"

const ICON_WRAPPER: ViewStyle = {
  flex: 1,
}
const BOOKM_ICON: ViewStyle & { color: string } = {
  color: color.primary,
}

export const RecipeSubmitLoader = () => {
  return (
    <Screen unsafe>
      <Box jc="center" ai="center" style={ICON_WRAPPER}>
        <BookmIcon width={59} height={59} style={BOOKM_ICON} />
      </Box>
    </Screen>
  )
}

export const RecipePreviewScreen = observer(function RecipePreviewScreen() {
  const { user, recipeStore, request } = useStores()
  const navigation = useNavigation()
  const [submitting, setSubmitStatus] = useState(false)

  useEffect(() => {
    if (request.status === "CONFIRMED") {
      navigation.navigate("MyBookMScreen")
    }
  }, [request.status])

  const author = {
    firstname: user.firstname || "Adrien",
    image: {
      uri:
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    },
  }

  const handleNavigation = () => {
    navigation.navigate("RecipePreviewStepScreen")
  }
  const handleRecipeCreation = async () => {
    setSubmitStatus(true)
    await recipeStore.createRecipe()
    setSubmitStatus(false)
  }
  const handleGoBack = () => {
    navigation.goBack()
  }

  if (submitting) {
    return <RecipeSubmitLoader />
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
})
