import React, { FC, MutableRefObject, useState } from "react"
import { TextStyle, ViewStyle, TouchableOpacity, View, Image, ImageStyle } from "react-native"
import BottomSheet from "reanimated-bottom-sheet"
import { ImagePickerResponse } from "react-native-image-picker"
import { color, typography } from "../../../theme"
import { Box, Text, TextField } from "../../../components"
import shadowViewStyle from "../../../utils/shadow"
import { UseFieldArrayMethods } from "react-hook-form"
import { reanimatedBottomSheet } from "../recipe-creation.share"
import { RecipeCreationStockPicture } from "./recipe-creation-stock-picture"
import CrossIcon from "../assets/cross.svg"

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
  textAlign: "center",
  fontSize: 13,
  lineHeight: 18,
  fontWeight: "300",
}

const BOTTOMSHEET_HEADER: ViewStyle = {
  ...shadowViewStyle(0, -7),
  backgroundColor: color.background,
  paddingVertical: PADDING,
  height: HEADER_HEIGHT,
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
const LABEL_CONTAINER: ViewStyle = {
  flexGrow: 1,
}

interface IRecipeCreationStockBottomSheetProps {
  sheetRef: MutableRefObject<BottomSheet>
  imageStockPickerSheetRef: MutableRefObject<BottomSheet>
  snapPoints: (number | string)[]
  initialSnap: number
  ingredients: UseFieldArrayMethods<Record<string, any>, "id">
  currentImagePicking: ImagePickerResponse
}
export const RecipeCreationStockBottomSheet: FC<IRecipeCreationStockBottomSheetProps> = ({
  sheetRef,
  imageStockPickerSheetRef,
  snapPoints,
  initialSnap,
  ingredients,
  currentImagePicking,
}) => {
  const [label, setLabel] = useState("")
  const fff = reanimatedBottomSheet([165, 0], 1)

  const handlePress = () => {
    fff.animate(imageStockPickerSheetRef).slideTop()
  }

  const handleRemoveIngredient = (index: number) => () => {
    ingredients.remove(index)
  }

  const handleSubmitEditing = () => {
    if (currentImagePicking && label) {
      ingredients.append({
        value: {
          image: currentImagePicking,
          label,
        },
      })
    }
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      renderHeader={() => (
        <>
          <View style={BOTTOMSHEET_HEADER_T}></View>
          <View style={BOTTOMSHEET_HEADER}>
            <Text text="Stock d’ingrédients " style={RECIPE_INFO_SHEET_TITLE} />
            <Box ai="center">
              <Text
                text="Merci de préciser la quantité lors de l’ajout. Vous pouvez également ajouter une photo de votre ingrédient pour illuster votre préférence."
                style={RECIPE_STOCK_SHEET_SUBTITLE}
              />
            </Box>
          </View>
        </>
      )}
      renderContent={() => (
        <View style={BOTTOMSHEET_CONTENT}>
          <Box fd="row" ai="center" jc="between">
            <TouchableOpacity onPress={handlePress}>
              <RecipeCreationStockPicture currentImagePicking={currentImagePicking} />
            </TouchableOpacity>
            <TextField
              placeholder="Entrez votre ingrédient"
              onChangeText={setLabel}
              returnKeyType="done"
              onSubmitEditing={handleSubmitEditing}
            />
          </Box>
          {ingredients.fields.map((field, index) => (
            <Box fd="row" ai="center" key={field.id}>
              <Image source={{ uri: field.value?.image.uri }} style={IMAGE_INGREDIENT} />
              <Box fd="row" ai="center" jc="between" style={LABEL_CONTAINER}>
                <Text text={field.value?.label} />
                <TouchableOpacity onPress={handleRemoveIngredient(index)}>
                  <CrossIcon width={12} height={12} />
                </TouchableOpacity>
              </Box>
            </Box>
          ))}
        </View>
      )}
    />
  )
}
