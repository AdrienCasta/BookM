import * as React from "react"
import { ViewStyle, TouchableOpacity } from "react-native"
import { color } from "../../theme"
import { Box } from ".."
import Picture from "../picture/picture"
import shadowViewStyle from "../../utils/shadow"
import { IRecipeFieldValues } from "../../models/recipe/recipe"

const SPACE_BETWEEN = 5

const ROOT: ViewStyle = {
  flexWrap: "wrap",
  marginTop: -SPACE_BETWEEN,
  marginHorizontal: -SPACE_BETWEEN,
}
const RECIPES_ITEM_SHADOW: ViewStyle = {
  ...shadowViewStyle(0, 3),
  backgroundColor: color.secondary,
  borderRadius: 12,
  width: 108,
  height: 108,
  margin: SPACE_BETWEEN,
}
const RECIPES_EMPTY_ITEM: ViewStyle = {
  width: 108,
  height: 108,
  margin: SPACE_BETWEEN,
}

export interface RecipeThumbnailListProps {
  recipes: Partial<{ id: string; image: string }>[]
  onItemPress: (d: Partial<IRecipeFieldValues & { id: string }>) => void
}

export const RecipeThumbnailList = (props: RecipeThumbnailListProps) => {
  const { recipes, onItemPress } = props

  const handlePress = (recipe) => () => onItemPress(recipe)

  const emptyListItems = 3 - (recipes.length % 3)

  return (
    <Box fd="row" style={ROOT} jc="center">
      {recipes.map((recipe) => {
        return (
          <TouchableOpacity
            key={recipe.id}
            onPress={handlePress(recipe)}
            style={RECIPES_ITEM_SHADOW}
          >
            <Picture variant="l" uri={recipe.image} />
          </TouchableOpacity>
        )
      })}
      {emptyListItems < 3 &&
        [...Array(emptyListItems)].map((d, i) => {
          return <TouchableOpacity key={i} style={RECIPES_EMPTY_ITEM}></TouchableOpacity>
        })}
    </Box>
  )
}
