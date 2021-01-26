import React, { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import { TextStyle, ViewStyle, TextInput, TouchableOpacity, View } from "react-native"
import { Box, Button, Text } from "../../components"
import BottomSheet from "reanimated-bottom-sheet"
import { color, typography } from "../../theme"
import shadowViewStyle from "../../utils/shadow"
import { Controller, useForm } from "react-hook-form"
import {
  IRecipeInfoFormData,
  reanimatedBottomSheet,
  recipeInfoIcons,
} from "./recipe-creation.share"

const BORDER_TOP_RADIUS = 40
const HEADER_HEIGHT = 80
const PADDING = 20

const RECIPE_INFO_SHEET: ViewStyle = {
  transform: [{ translateY: -(HEADER_HEIGHT - PADDING) }],
  height: "100%",
  padding: PADDING,
}
const RECIPE_INFO_SHEET_CONTAINER: ViewStyle = {
  backgroundColor: color.background,
  height: "100%",
}
const RECIPE_INFO_SHEET_TITLE: TextStyle = {
  textAlign: "center",
  fontSize: 20,
  fontWeight: "bold",
  color: color.palette.orange,
  fontFamily: typography.secondary,
  paddingBottom: 12,
}
const RECIPE_INFO_SHEET_SUBTITLE: TextStyle = {
  textAlign: "center",
  fontSize: 13,
}

const RECIPE_INFO_SHEET_ITEM_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 13,
}
const RECIPE_INFO_SHEET_ITEM_TEXT_CONTAINER: ViewStyle = {
  position: "absolute",
  bottom: -PADDING,
  left: 0,
  right: 0,
}
const RECIPE_INFO_SHEET_ITEM_SHADOW: ViewStyle = {
  ...shadowViewStyle(-2, -1),
  height: 90,
  width: 90,
  backgroundColor: color.background,
  borderRadius: 20,
  marginBottom: 6,
}
const RECIPE_INFO_SHEET_ITEM: ViewStyle = {
  paddingHorizontal: 30,
}
const RECIPE_INFO_SHEET_ITEM_ROWS: ViewStyle = {
  width: 300,
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
  backgroundColor: color.palette.orange,
  opacity: 0.4,
  transform: [{ translateY: HEADER_HEIGHT - PADDING }],
  height: HEADER_HEIGHT,
  borderTopLeftRadius: BORDER_TOP_RADIUS,
  borderTopRightRadius: BORDER_TOP_RADIUS,
}
interface IRecipeCreationInfoBottomSheetProps {
  sheetRef: MutableRefObject<BottomSheet>
  onSubmit: (data: IRecipeInfoFormData) => void
}
export const RecipeCreationInfoBottomSheet: FC<IRecipeCreationInfoBottomSheetProps> = ({
  sheetRef,
  onSubmit,
}) => {
  const recipeInfoSheet = reanimatedBottomSheet(["100%", 460, 0], 2)

  const handleRecipeInfoSheetContentFocus = () => {
    recipeInfoSheet.animate(sheetRef).slideTop()
  }
  const handleRecipeInfoSubmit = (recipeInfoFormData: IRecipeInfoFormData) => {
    onSubmit(recipeInfoFormData)
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={recipeInfoSheet.snapPoint}
      initialSnap={recipeInfoSheet.initialSnapPoint}
      renderHeader={() => (
        <>
          <View style={BOTTOMSHEET_HEADER_T}></View>
          <View style={BOTTOMSHEET_HEADER}>
            <Text text="Paramètres" style={RECIPE_INFO_SHEET_TITLE} />
            <Text
              text="Quantité, temps et calories pour cette fiche recette "
              style={RECIPE_INFO_SHEET_SUBTITLE}
            />
          </View>
        </>
      )}
      renderContent={() => (
        <RecipeInfoSheetContent
          onSubmit={handleRecipeInfoSubmit}
          onFocus={handleRecipeInfoSheetContentFocus}
        />
      )}
    />
  )
}
const RecipeInfoSheetContent: FC<{
  onSubmit: (s: IRecipeInfoFormData) => void
  onFocus: () => void
}> = ({ onSubmit, onFocus }) => {
  const numberOfPersonsFieldRef = useRef<TextInput>(null)
  const timeFieldRef = useRef<TextInput>(null)
  const cookingTimeFieldRef = useRef<TextInput>(null)
  const calorieFieldRef = useRef<TextInput>(null)

  const { control, handleSubmit } = useForm<IRecipeInfoFormData>()

  const [currentFocusFieldRef, setCurrentFocusFieldRef] = useState<MutableRefObject<TextInput>>(
    null,
  )

  useEffect(() => {
    if (currentFocusFieldRef) {
      currentFocusFieldRef?.current.focus()
      onFocus()
    }
  }, [currentFocusFieldRef])

  const handleFocus = (ref: MutableRefObject<TextInput>) => () => {
    setCurrentFocusFieldRef(ref)
  }

  const recipeInfo: [MutableRefObject<TextInput>, keyof IRecipeInfoFormData, string][] = [
    [numberOfPersonsFieldRef, "numberOfPersons", " personnes"],
    [timeFieldRef, "time", " min de preparations"],
    [cookingTimeFieldRef, "cookingTime", " min de cuisson"],
    [calorieFieldRef, "numberOfCalories", " calories / personnes"],
  ]

  const [one, two, three, four] = recipeInfo.map(([ref, name, text]) => {
    const Icon = recipeInfoIcons.get(name)
    return (
      <TouchableOpacity key={name} onPressOut={handleFocus(ref)} style={RECIPE_INFO_SHEET_ITEM}>
        <Box ai="center" jc="center" style={RECIPE_INFO_SHEET_ITEM_SHADOW}>
          <Icon width={56} height={55} color={color.palette.orange} />
        </Box>
        <Box fd="row" jc="center" ai="end" style={RECIPE_INFO_SHEET_ITEM_TEXT_CONTAINER}>
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                maxLength={3}
                keyboardType="number-pad"
                returnKeyType="done"
                ref={ref}
                underlineColorAndroid={color.palette.orange}
                style={{ color: color.palette.orange }}
              />
            )}
            name={name}
            defaultValue=""
          />
          <Text text={text} style={RECIPE_INFO_SHEET_ITEM_TEXT} />
        </Box>
      </TouchableOpacity>
    )
  })

  return (
    <View style={RECIPE_INFO_SHEET_CONTAINER}>
      <Box style={RECIPE_INFO_SHEET} jc="around">
        <Box jc="between" ai="center">
          <Box fd="row" jc="between" style={RECIPE_INFO_SHEET_ITEM_ROWS}>
            {one}
            {two}
          </Box>
          <Box
            fd="row"
            jc="between"
            style={{ ...RECIPE_INFO_SHEET_ITEM_ROWS, ...{ marginTop: 30 } }}
          >
            {three}
            {four}
          </Box>
        </Box>
        <Button preset="large" text="valider" onPress={handleSubmit(onSubmit)} />
      </Box>
    </View>
  )
}
