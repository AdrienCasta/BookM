import React, { FC, MutableRefObject } from "react"
import { TextStyle, ViewStyle, View, Image, ImageStyle, ScrollView } from "react-native"
import BottomSheet from "reanimated-bottom-sheet"

import { IRecipeFieldValues } from "../../models/recipe/recipe"
import { reanimatedBottomSheet } from "../../screens/recipe-creation/recipe-creation.share"
import { color, typography } from "../../theme"
import shadowViewStyle from "../../utils/shadow"
import { Box } from "../box/box"
import { Text } from "../text/text"

const BORDER_TOP_RADIUS = 40
const HEADER_HEIGHT = 80
const PADDING = 20

const RECIPE_INFO_SHEET_TITLE: TextStyle = {
  textAlign: "center",
  fontSize: 20,
  fontWeight: "bold",
  color: color.palette.green,
  fontFamily: typography.secondary,
  paddingBottom: 12,
}
const RECIPE_STOCK_SHEET_SUBTITLE: TextStyle = {
  maxWidth: 270,
  fontSize: 13,
  lineHeight: 18,
  fontWeight: "300",
}

const BOTTOMSHEET_HEADER: ViewStyle = {
  ...shadowViewStyle(0, -7),
  backgroundColor: color.background,
  paddingVertical: PADDING,
  borderTopLeftRadius: BORDER_TOP_RADIUS,
  borderTopRightRadius: BORDER_TOP_RADIUS,
}
const BOTTOMSHEET_HEADER_T: ViewStyle = {
  backgroundColor: color.palette.green,
  opacity: 0.4,
  transform: [{ translateY: HEADER_HEIGHT - PADDING }],
  height: HEADER_HEIGHT,
  borderTopLeftRadius: BORDER_TOP_RADIUS,
  borderTopRightRadius: BORDER_TOP_RADIUS,
}

const BOTTOMSHEET_CONTENT: ViewStyle = {
  height: "100%",
  backgroundColor: color.background,
  paddingTop: 30,
  paddingHorizontal: 20,
}

const IMAGE_INGREDIENT: ImageStyle = {
  width: 64,
  height: 64,
  marginRight: 30,
  borderRadius: 10,
}

const INGREDIENT_LIST: ImageStyle = {
  paddingLeft: 30,
}
const INGREDIENT: ImageStyle = {
  marginBottom: 13,
}

interface IRecipeStockBottomSheetProps extends Pick<IRecipeFieldValues, "ingredients"> {
  sheetRef: MutableRefObject<BottomSheet>
}
export const RecipeStockBottomSheet: FC<IRecipeStockBottomSheetProps> = ({
  sheetRef,
  ingredients,
}) => {
  const imageStockPickerSheet = reanimatedBottomSheet(["100%", 350, 0], 2)
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={imageStockPickerSheet.snapPoint}
      initialSnap={imageStockPickerSheet.initialSnapPoint}
      renderHeader={() => (
        <>
          <View style={BOTTOMSHEET_HEADER_T}></View>
          <View style={BOTTOMSHEET_HEADER}>
            <Text text="Stock d’ingrédients " style={RECIPE_INFO_SHEET_TITLE} />
            <Box ai="center">
              <Text
                text="Ingrédients pour cette fiche recette"
                style={RECIPE_STOCK_SHEET_SUBTITLE}
              />
            </Box>
          </View>
        </>
      )}
      renderContent={() => (
        <View style={BOTTOMSHEET_CONTENT}>
          <ScrollView style={INGREDIENT_LIST}>
            {ingredients.map((ingredient) => (
              <Box fd="row" ai="center" style={INGREDIENT} key={ingredient.label}>
                <Image source={{ uri: ingredient?.image.uri }} style={IMAGE_INGREDIENT} />

                <Text text={ingredient.label} />
              </Box>
            ))}
          </ScrollView>
        </View>
      )}
    />
  )
}
