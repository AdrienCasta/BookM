import React, { FC, MutableRefObject, useEffect, useState } from "react"
import {
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  View,
  Image,
  ImageStyle,
  ScrollView,
} from "react-native"
import BottomSheet from "reanimated-bottom-sheet"
import { ImagePickerResponse } from "react-native-image-picker"
import { color, typography } from "../../../theme"
import { Box, Button, Text, TextField } from "../../../components"
import shadowViewStyle from "../../../utils/shadow"
import { Control, Controller, UseFieldArrayMethods } from "react-hook-form"
import { reanimatedBottomSheet } from "../recipe-creation.share"
import { RecipeCreationStockPicture } from "./recipe-creation-stock-picture"
import CrossIcon from "../../../../assets/cross.svg"
import { IRecipeFieldValues } from "../../../models/recipe/recipe"

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
  marginTop: 90,
  marginBottom: 20,
}
const INGREDIENT: ImageStyle = {
  marginBottom: 13,
}

const LABEL_CONTAINER: ViewStyle = {
  flexGrow: 1,
}

const CROSS_ICON_CONTAINER: ViewStyle = {
  padding: 6,
  backgroundColor: color.palette.offWhite,
  borderRadius: 5,
}
const CROSS_ICON: ViewStyle & { color: string } = {
  color: color.error,
}

const TAG: ViewStyle = {
  ...shadowViewStyle(),
  paddingVertical: 5,
  paddingHorizontal: 10,
  backgroundColor: color.palette.offWhite,
  borderRadius: 30,
}

interface IRecipeCreationStockBottomSheetProps {
  control: Control<IRecipeFieldValues>
  sheetRef: MutableRefObject<BottomSheet>
  imageStockPickerSheetRef: MutableRefObject<BottomSheet>
  snapPoints: (number | string)[]
  initialSnap: number
  ingredients: UseFieldArrayMethods<Record<string, any>, "id">
  currentImagePicking: ImagePickerResponse
  onSubmit: () => void
}
export const RecipeCreationStockBottomSheet: FC<IRecipeCreationStockBottomSheetProps> = ({
  control,
  sheetRef,
  imageStockPickerSheetRef,
  snapPoints,
  initialSnap,
  ingredients,
  currentImagePicking,
  onSubmit,
}) => {
  const [label, setLabel] = useState("")
  const [preview, setPreview] = useState(currentImagePicking)
  const imageStockPickerSheet = reanimatedBottomSheet([165, 0], 1)

  const handlePress = () => {
    imageStockPickerSheet.animate(imageStockPickerSheetRef).slideTop()
  }

  const handleRemoveIngredient = (index: number) => () => {
    ingredients.remove(index)
  }

  useEffect(() => {
    setPreview(currentImagePicking)
    imageStockPickerSheet.animate(imageStockPickerSheetRef).slideDown()
  }, [currentImagePicking])

  const handleSubmitEditing = () => {
    if (label) {
      ingredients.append({
        image: preview?.uri || "",
        label,
      })
      setPreview(undefined)
      setLabel("")
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
              <RecipeCreationStockPicture preview={preview} />
            </TouchableOpacity>
            <View>
              <TextField
                placeholder="Entrez votre ingrédient"
                value={label}
                onChangeText={setLabel}
              />
              <TouchableOpacity onPress={handleSubmitEditing}>
                <Box style={TAG} aself="start">
                  <Text text="+ Ajouter" />
                </Box>
              </TouchableOpacity>
            </View>
          </Box>
          <ScrollView style={INGREDIENT_LIST}>
            {ingredients.fields.map((field, index) => (
              <Box fd="row" ai="center" style={INGREDIENT} key={field.id}>
                <Controller
                  control={control}
                  defaultValue={field.image}
                  name={`ingredients[${index}].image`}
                  render={() => {
                    console.tron.log(field)
                    if (!field.image) {
                      return null
                    }

                    return <Image source={{ uri: field?.image }} style={IMAGE_INGREDIENT} />
                  }}
                />
                <Controller
                  control={control}
                  defaultValue={field.label}
                  name={`ingredients[${index}].label`}
                  render={() => {
                    if (!field.label) {
                      return null
                    }
                    return (
                      <Box fd="row" ai="center" jc="between" style={LABEL_CONTAINER}>
                        <Text text={field.label} />
                        <TouchableOpacity
                          onPress={handleRemoveIngredient(index)}
                          style={CROSS_ICON_CONTAINER}
                        >
                          <CrossIcon width={12} height={12} style={CROSS_ICON} />
                        </TouchableOpacity>
                      </Box>
                    )
                  }}
                />
              </Box>
            ))}
          </ScrollView>
          <Button
            preset="large"
            text="Valider"
            onPress={onSubmit}
            disabled={ingredients.fields.length === 0}
          />
        </View>
      )}
    />
  )
}
