import React, { useRef } from "react"
import { TouchableOpacity, TextStyle, View, ViewStyle } from "react-native"
import { Box, Button, Screen, Text } from "../../components"
import { Avatar } from "../../components/avatar/avatar"
import { RecipeFavCard } from "../../components/recipe-fav-card/recipe-fav-card"
import { RecipePicture } from "../../components/recipe-picture/recipe-picture"
import { RecipeQuantifiableBottomSheet } from "../../components/recipe-quantifiable-bottom-sheet/recipe-quantifiable-bottom-sheet"
import { RecipeQuantifiableCard } from "../../components/recipe-quantifiable-card/recipe-quantifiable-card"
import { RecipeStockBottomSheet } from "../../components/recipe-stock-bottom-sheet/recipe-stock-bottom-sheet"
import { RecipeStockCard } from "../../components/recipe-stock-card/recipe-stock-card"
import { IRecipeFieldValues } from "../../models/recipe/recipe"
import { typography } from "../../theme"

const TITLE: TextStyle = {
  fontSize: 20,
  fontWeight: "700",
  fontFamily: typography.secondary,
  marginTop: 24,
  marginBottom: 5,
}
const DESCRIPTION: TextStyle = {
  fontSize: 13,
  marginTop: 14,
  marginBottom: 30,
  flex: 1,
  flexWrap: "wrap",
  marginRight: 35,
  lineHeight: 17,
}
const AUTHOR: TextStyle = {
  fontSize: 9,
}
const BODY: TextStyle = {
  paddingHorizontal: 32,
  marginBottom: 20,
}

const PUBLISH: ViewStyle = {
  position: "absolute",
  zIndex: 1,
  right: 20,
  top: 50,
}

interface RecipePreviewTemplateProps {
  recipe: IRecipeFieldValues
  author: { firstname: string; image: { uri: string } }
  onCookPress: () => void
  onPublish: () => void
}

const fomatDuration = (duration: Date) => {
  const mn = duration.getMinutes() > 9 ? duration.getMinutes() : `0${duration.getMinutes()}`
  const h = `${duration.getHours() ? duration.getHours() + ":" : "00:"}`
  return `${h}${mn}`
}

export const RecipePreviewTemplate = function RecipePreviewTemplate({
  recipe,
  author,
  onCookPress,
  onPublish,
}: RecipePreviewTemplateProps) {
  const ref = useRef(null)
  const stockRef = useRef(null)

  const handlePress = () => {
    ref?.current.snapTo(1)
  }
  const handleStockPress = () => {
    stockRef?.current.snapTo(1)
  }

  const { cookingTime, time, numberOfPersons, numberOfCalories } = recipe

  const quantifiableInfos = {
    cookingTime: fomatDuration(cookingTime),
    time: fomatDuration(time),
    numberOfPersons,
    numberOfCalories,
  }

  return (
    <>
      <Screen preset="scroll" unsafe>
        <TouchableOpacity style={PUBLISH} onPress={onPublish}>
          <Text text="Publier" />
        </TouchableOpacity>
        <RecipePicture uri={recipe.image.uri} />
        <View style={BODY}>
          <Text text={recipe.title} style={TITLE} />
          <Text text={`par ${author.firstname}`} style={AUTHOR} />
          <Box fd="row">
            <Text text={recipe.description} style={DESCRIPTION} />
            <Avatar uri={author.image.uri} />
          </Box>
          <Box fd="row" jc="between">
            <TouchableOpacity onPress={handlePress}>
              <RecipeQuantifiableCard {...quantifiableInfos} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleStockPress}>
              <RecipeStockCard />
            </TouchableOpacity>
            <RecipeFavCard />
          </Box>
        </View>
        <Button text="Cuisinez !" preset="ghostLarge" onPress={onCookPress} />
      </Screen>
      <RecipeQuantifiableBottomSheet sheetRef={ref} {...quantifiableInfos} />
      <RecipeStockBottomSheet ingredients={recipe.ingredients} sheetRef={stockRef} />
    </>
  )
}
