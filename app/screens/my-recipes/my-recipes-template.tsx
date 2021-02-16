import React from "react"
import { ViewStyle, TouchableOpacity, TextStyle } from "react-native"
import { Screen, RecipeThumbnailList, Box, Text } from "../../components"
import { IRecipeFieldValues } from "../../models/recipe/recipe"
import ChevronIcon from "../../../assets/chevron.svg"
import { color, typography } from "../../theme"

const ROOT: ViewStyle = {}
const HEADER: ViewStyle = { paddingLeft: 38, paddingRight: 27 }
const CHEVRON: ViewStyle & { color: string } = {
  color: color.primary,
  transform: [{ rotateY: "180deg" }],
}
const POINTS: TextStyle = { fontWeight: "bold", fontSize: 20 }
const TITLE: TextStyle = {
  fontWeight: "bold",
  fontFamily: typography.secondary,
  fontSize: 15,
  textAlign: "center",
  marginBottom: 26,
}

interface Props {
  recipes: { id: string; image: string }[]
  onRecipePress: (recipe: Partial<IRecipeFieldValues> & { id: string }) => void
}

export const MyRecipesTemplate = ({ recipes, onRecipePress }: Props) => {
  return (
    <Screen style={ROOT} preset="scroll">
      <Box fd="row" jc="between" ai="center" style={HEADER}>
        <ChevronIcon style={CHEVRON} />
        <TouchableOpacity>
          <Text style={POINTS}>...</Text>
        </TouchableOpacity>
      </Box>
      <Text style={TITLE}>Mes recettes </Text>
      <RecipeThumbnailList recipes={recipes} onItemPress={onRecipePress} />
    </Screen>
  )
}
