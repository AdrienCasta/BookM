import React, { useRef } from "react"
import { ViewStyle, TouchableOpacity, TextStyle, View } from "react-native"
import { Screen, Text } from "../../components"
import { RecipePicture } from "../../components/recipe-picture/recipe-picture"
import { RecipeQuantifiableBottomSheet } from "../../components/recipe-quantifiable-bottom-sheet/recipe-quantifiable-bottom-sheet"
import { RecipeQuantifiableCard } from "../../components/recipe-quantifiable-card/recipe-quantifiable-card"
import { RecipeStockBottomSheet } from "../../components/recipe-stock-bottom-sheet/recipe-stock-bottom-sheet"
import { RecipeStockCard } from "../../components/recipe-stock-card/recipe-stock-card"
import { IRecipeFieldValues } from "../../models/recipe/recipe"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { typography } from "../../theme"

const ROOT: ViewStyle = {
  flex: 1,
}
const TITLE: TextStyle = {
  fontSize: 20,
  fontWeight: "700",
  fontFamily: typography.secondary,
}
const DESCRIPTION: TextStyle = {
  fontSize: 13,
}
const AUTHOR: TextStyle = {
  fontSize: 9,
}
const BODY: TextStyle = {
  paddingHorizontal: 32,
}

interface RecipePreviewTemplateProps {
  recipe: IRecipeFieldValues
  author: string
}

export const RecipePreviewTemplate = function RecipePreviewTemplate({
  recipe,
  author,
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
  return (
    <Screen style={ROOT} preset="scroll">
      <RecipePicture uri={recipe.image.uri} />
      <View style={BODY}>
        <Text text={recipe.title} style={TITLE} />
        <Text text={`par ${author}`} style={AUTHOR} />
        <Text text={recipe.description} style={DESCRIPTION} />
        <TouchableOpacity onPress={handlePress}>
          <RecipeQuantifiableCard
            cookingTime={cookingTime.getMinutes() + ""}
            time={time.getMinutes() + ""}
            numberOfPersons={numberOfPersons}
            numberOfCalories={numberOfCalories}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStockPress}>
          <RecipeStockCard />
        </TouchableOpacity>
      </View>
      <RecipeQuantifiableBottomSheet
        sheetRef={ref}
        {...{
          cookingTime: cookingTime.getMinutes() + "",
          time: time.getMinutes() + "",
          numberOfPersons,
          numberOfCalories,
        }}
      />
      <RecipeStockBottomSheet ingredients={recipe.ingredients} sheetRef={stockRef} />
    </Screen>
  )
}
