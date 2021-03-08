import React, { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import { TextStyle, ViewStyle, TextInput, TouchableOpacity, View, Keyboard } from "react-native"
import { TimePicker } from "react-native-simple-time-picker"
import { Box, Text } from "../../../components"
import BottomSheet from "reanimated-bottom-sheet"
import { Control, Controller, FieldName, SetFieldValue, SetValueConfig } from "react-hook-form"
import { color, typography } from "../../../theme"
import shadowViewStyle from "../../../utils/shadow"
import {
  IRecipeInfoFormData,
  reanimatedBottomSheet,
  recipeInfoIcons,
} from "../recipe-creation.share"
import { IRecipeFieldValues } from "../../../models/recipe/recipe"

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
  paddingTop: HEADER_HEIGHT,
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
  ...shadowViewStyle(0, -5),
  backgroundColor: color.background,
  paddingVertical: PADDING,
  height: HEADER_HEIGHT,
  borderTopLeftRadius: BORDER_TOP_RADIUS,
  borderTopRightRadius: BORDER_TOP_RADIUS,
}
const BOTTOMSHEET_HANDLEBAR: ViewStyle = {
  width: 38,
  height: 6,
  backgroundColor: color.palette.orange,
  borderRadius: 6,
  transform: [{ translateY: 7 - PADDING }],
}
const BOTTOMSHEET_HEADER_T: ViewStyle = {
  backgroundColor: color.palette.orangeAlpha,
  transform: [{ translateY: HEADER_HEIGHT - PADDING }],
  height: HEADER_HEIGHT,
  borderTopLeftRadius: BORDER_TOP_RADIUS,
  borderTopRightRadius: BORDER_TOP_RADIUS,
}

interface IRecipeCreationInfoBottomSheetProps {
  sheetRef: MutableRefObject<BottomSheet>
  control: Control<IRecipeFieldValues>
  values: Pick<IRecipeFieldValues, "time" | "cookingTime">
  setValue(
    name: FieldName<IRecipeFieldValues>,
    value: SetFieldValue<IRecipeFieldValues>,
    config?: SetValueConfig,
  ): void
}
export const RecipeCreationInfoBottomSheet: FC<IRecipeCreationInfoBottomSheetProps> = ({
  sheetRef,
  setValue,
  control,
  values,
}) => {
  const recipeInfoSheet = reanimatedBottomSheet(["100%", 460, 0], 2)

  const handleRecipeInfoSheetContentFocus = () => {
    recipeInfoSheet.animate(sheetRef).slideTop()
  }
  const numberOfPersonsFieldRef = useRef<TextInput>(null)
  const calorieFieldRef = useRef<TextInput>(null)

  const [timePickerValue, setTimePickerValue] = useState<Record<"hours" | "minutes", number>>({
    hours: 0,
    minutes: 0,
  })
  const [currentTimeField, setTimeField] = useState<
    keyof Pick<IRecipeFieldValues, "time" | "cookingTime">
  >("time")

  const handleChange = ({ hours, minutes }) => {
    setValue(currentTimeField, new Date((hours * 3600 + minutes * 60) * 1000))
  }

  const [currentFocusFieldRef, setCurrentFocusFieldRef] = useState<MutableRefObject<TextInput>>(
    null,
  )

  useEffect(() => {
    if (values[currentTimeField]) {
      setTimePickerValue({
        hours: values[currentTimeField].getUTCHours(),
        minutes: values[currentTimeField].getMinutes(),
      })
    }
  }, [currentTimeField])

  useEffect(() => {
    if (currentFocusFieldRef) {
      currentFocusFieldRef?.current.focus()
    }
  }, [currentFocusFieldRef])

  const handlePress = (ref: MutableRefObject<TextInput> | null, name) => () => {
    handleRecipeInfoSheetContentFocus()
    if (name === "time" || name === "cookingTime") {
      setTimeField(name)
      Keyboard.dismiss()
      return
    }
    setCurrentFocusFieldRef(ref)
  }

  const recipeInfo: [MutableRefObject<TextInput> | null, keyof IRecipeInfoFormData, string][] = [
    [numberOfPersonsFieldRef, "numberOfPersons", " personnes"],
    [null, "time", " min de preparations"],
    [null, "cookingTime", " min de cuisson"],
    [calorieFieldRef, "numberOfCalories", " calories / personnes"],
  ]

  const formatDuration = (date: Date) => {
    if (!date) {
      return null
    }
    const h = date.getUTCHours()
    const m = date.getMinutes()
    return `${h ? h + " h" : ""} ${m}`
  }

  const [one, two, three, four] = recipeInfo.map(([ref, name, text]) => {
    const Icon = recipeInfoIcons.get(name)
    return (
      <TouchableOpacity
        key={name}
        onPressOut={handlePress(ref, name)}
        style={RECIPE_INFO_SHEET_ITEM}
      >
        <Box ai="center" jc="center" style={RECIPE_INFO_SHEET_ITEM_SHADOW}>
          <Icon width={56} height={55} color={color.palette.orange} />
        </Box>
        <Box fd="row" jc="center" ai="end" style={RECIPE_INFO_SHEET_ITEM_TEXT_CONTAINER}>
          <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ onChange, value }) => {
              return (
                <TextInput
                  value={Object.keys(values).includes(name) ? formatDuration(values[name]) : value}
                  onChangeText={onChange}
                  maxLength={3}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  ref={ref}
                  underlineColorAndroid={color.palette.orange}
                  style={{ color: color.palette.orange }}
                />
              )
            }}
          />
          <Text text={text} style={RECIPE_INFO_SHEET_ITEM_TEXT} />
        </Box>
      </TouchableOpacity>
    )
  })

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={recipeInfoSheet.snapPoint}
      initialSnap={recipeInfoSheet.initialSnapPoint}
      onCloseStart={Keyboard.dismiss}
      renderHeader={() => (
        <>
          <View style={BOTTOMSHEET_HEADER_T}>
            <Box fd="row" jc="center">
              <View style={BOTTOMSHEET_HANDLEBAR}></View>
            </Box>
          </View>
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
        <View style={RECIPE_INFO_SHEET_CONTAINER}>
          <Box style={RECIPE_INFO_SHEET} jc="between">
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
            <TimePicker
              hoursUnit="h"
              minutesUnit="mn"
              value={timePickerValue}
              onChange={handleChange}
            />
          </Box>
        </View>
      )}
    />
  )
}
