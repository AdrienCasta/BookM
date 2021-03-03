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
import { color, typography } from "../../theme"
import ChevronIcon from "../../../assets/chevron.svg"

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
  paddingHorizontal: 11,
  paddingVertical: 6,
  backgroundColor: "rgba(42, 201, 64, 0.39)",
  borderRadius: 20,
}

const PUBLISH_TEXT: TextStyle = {
  color: color.secondary,
  fontFamily: typography.secondary,
  fontWeight: "700",
}

const ROOT: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
}
const CHEVRON_WRAPPER: ViewStyle = {
  paddingVertical: 5,
  paddingHorizontal: 9,
  borderRadius: 20,
  backgroundColor: "rgba(0, 0, 0, 0.18)",
  transform: [{ rotateY: "180deg" }],
}
const CHEVRON: ViewStyle & { color: string } = {
  color: color.secondary,
}

const HEADER: ViewStyle = {
  position: "absolute",
  width: "100%",
  zIndex: 1,
  paddingHorizontal: 20,
  top: 50,
}

interface RecipePreviewTemplateProps {
  recipe: IRecipeFieldValues
  author: { firstname: string; image: { uri: string } }
  onCookPress: () => void
  onPublish: () => void
  onGoBack: () => void
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
  onGoBack,
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
      <Screen preset="scroll" unsafe style={ROOT}>
        <Box jc="between" style={CONTAINER}>
          <View>
            <Box style={HEADER} fd="row" jc="between" ai="center">
              <TouchableOpacity style={CHEVRON_WRAPPER} onPress={onGoBack}>
                <ChevronIcon width={9} height={14} style={CHEVRON} />
              </TouchableOpacity>
              <TouchableOpacity style={PUBLISH} onPress={onPublish}>
                <Text text="Publier" style={PUBLISH_TEXT} />
              </TouchableOpacity>
            </Box>
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
          </View>
          <Button text="Cuisinez !" preset="ghostLarge" onPress={onCookPress} />
        </Box>
      </Screen>
      <RecipeQuantifiableBottomSheet sheetRef={ref} {...quantifiableInfos} />
      <RecipeStockBottomSheet ingredients={recipe.ingredients} sheetRef={stockRef} />
    </>
  )
}
