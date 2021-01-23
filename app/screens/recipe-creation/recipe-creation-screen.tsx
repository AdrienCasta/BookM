import React, { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ImageBackground,
  TextStyle,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { Box, Button, Screen, Text, TextField } from "../../components"
import BottomSheet from "reanimated-bottom-sheet"
import { color, typography } from "../../theme"
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker"
import UserIcon from "./user.svg"
import shadowViewStyle from "../../utils/shadow"
import { Controller, useForm } from "react-hook-form"

const ROOT: ViewStyle = {}
const BODY: ViewStyle = {
  paddingHorizontal: 20,
}
const BACKGROUND_IMAGE: ViewStyle = {
  borderBottomLeftRadius: 70,
  shadowOffset: { width: 0, height: -10 },
  shadowOpacity: 0.2,
  shadowColor: color.palette.black,
  shadowRadius: 2,
  backgroundColor: "#F7F7F7",
  height: 260,
  overflow: "hidden",
}
const RECIPE_INFO_PANEL: ViewStyle = {
  ...shadowViewStyle(2, 4),
  backgroundColor: color.palette.orange,
  width: 124,
  height: 124,
  borderRadius: 8,
  padding: 16,
}
const FORM_FIELD: ViewStyle = {
  marginTop: 20,
}
const RECIPE_INFO_PANEL_ITEM_TEXT: TextStyle = {
  color: color.background,
  fontWeight: "bold",
  fontSize: 11,
  paddingTop: 6,
}
const RECIPE_INFO_SHEET: ViewStyle = {
  ...shadowViewStyle(0, -5),
  backgroundColor: color.background,
  height: "100%",
  padding: 20,
}
const IMAGE_PICKER_SHEET: ViewStyle = {
  backgroundColor: color.background,
  padding: 16,
  height: 450,
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
  bottom: -20,
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

const imageOptions = {
  mediaType: "photo",
  maxWidth: 400,
} as ImageLibraryOptions

const reanimatedBottomSheet = (snapPoint, initialSnapPoint) => {
  return {
    initialSnapPoint,
    snapPoint,
    animate: (sheetRef: MutableRefObject<BottomSheet>) => {
      const snapTo = sheetRef?.current.snapTo
      const base = {
        slideTop: () => snapTo(0),
        slideDown: () => snapTo(1),
        slideMiddle: () => undefined,
      }

      if (snapPoint.length === 3) {
        return {
          ...base,
          slideMiddle: () => snapTo(1),
          slideDown: () => snapTo(2),
        }
      }
      return base
    },
  }
}

interface IRecipeFormData {
  numberOfPersons: string
  time: string
  cookingTime: string
  numberOfCalories: string
  image: string
}

export const RecipeCreationScreen = observer(function RecipeCreationScreen() {
  const { control, setValue, watch } = useForm<IRecipeFormData>()
  const recipeInfoSheetRef = React.useRef(null)
  const imagePickerSheetRef = React.useRef(null)
  const recipeInfoSheet = reanimatedBottomSheet(["100%", 460, 0], 2)
  const imagePickerSheet = reanimatedBottomSheet([300, 0], 1)

  useEffect(() => {
    imagePickerSheet.animate(imagePickerSheetRef).slideDown()
  }, [watch("image")])

  const handleImagePickerAppearance = () => {
    imagePickerSheet.animate(imagePickerSheetRef).slideTop()
  }
  const handleRecipeInfoAppearance = () => {
    recipeInfoSheet.animate(recipeInfoSheetRef).slideMiddle()
  }
  const handleRecipeInfoSheetContentFocus = () => {
    recipeInfoSheet.animate(recipeInfoSheetRef).slideTop()
  }
  const handleLaunchingImageLibrary = () => {
    launchImageLibrary(imageOptions, (image) => setValue("image", image))
  }
  const handleLaunchingCamera = () => {
    launchCamera(imageOptions, (image) => setValue("image", image))
  }
  const handleRecipeInfoSubmit = (recipeInfoFormData: Omit<IRecipeFormData, "image">) => {
    for (const key in recipeInfoFormData) {
      setValue(key as keyof typeof recipeInfoFormData, recipeInfoFormData[key])
    }
    recipeInfoSheet.animate(recipeInfoSheetRef).slideDown()
  }

  const renderContent = () => (
    <Box style={IMAGE_PICKER_SHEET}>
      <Button onPress={handleLaunchingImageLibrary} text="Séléctionner une photo" />
      <Button onPress={handleLaunchingCamera} text="Prendre une photo" />
    </Box>
  )
  return (
    <>
      <Screen style={ROOT} preset="scroll">
        <TouchableOpacity onPress={handleImagePickerAppearance}>
          <Controller
            control={control}
            defaultValue={null}
            name="image"
            render={({ value }) => (
              <ImageBackground source={{ uri: value?.uri }} style={BACKGROUND_IMAGE} />
            )}
          />
        </TouchableOpacity>
        <View style={BODY}>
          <View style={FORM_FIELD}>
            <Controller
              control={control}
              defaultValue=""
              name="title"
              render={({ value, onChange }) => (
                <TextField
                  value={value}
                  onChangeText={onChange}
                  label="Ajouter unn titre"
                  placeholder="Renseigner le titre de votre recette"
                />
              )}
            />
          </View>
          <View style={FORM_FIELD}>
            <Controller
              control={control}
              defaultValue=""
              name="description"
              render={({ value, onChange }) => (
                <TextField
                  preset="multiline"
                  scrollEnabled={false}
                  value={value}
                  multiline
                  onChangeText={onChange}
                  label="Ecrivez un commentaire "
                  placeholder="Votre commentaire"
                />
              )}
            />
          </View>
          <View style={FORM_FIELD}>
            <TouchableOpacity onPress={handleRecipeInfoAppearance}>
              <RecipeInfo control={control} />
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
      <BottomSheet
        ref={imagePickerSheetRef}
        snapPoints={imagePickerSheet.snapPoint}
        initialSnap={imagePickerSheet.initialSnapPoint}
        borderRadius={10}
        renderContent={renderContent}
      />
      <BottomSheet
        ref={recipeInfoSheetRef}
        snapPoints={recipeInfoSheet.snapPoint}
        initialSnap={recipeInfoSheet.initialSnapPoint}
        borderRadius={40}
        renderContent={() => (
          <RecipeInfoSheetContent
            onSubmit={handleRecipeInfoSubmit}
            onFocus={handleRecipeInfoSheetContentFocus}
          />
        )}
      />
    </>
  )
})

const RecipeInfo = ({ control }) => {
  const [one, two, three, four] = [
    "numberOfPersons",
    "time",
    "cookingTime",
    "numberOfCalories",
  ].map((name) => (
    <Box key={name} ai="center">
      <UserIcon />
      <Controller
        control={control}
        name={name}
        render={({ value }) => <Text text={value || "-"} style={RECIPE_INFO_PANEL_ITEM_TEXT} />}
      />
    </Box>
  ))
  return (
    <Box jc="between" style={RECIPE_INFO_PANEL}>
      <Box fd="row" jc="between">
        {one}
        {two}
      </Box>
      <Box fd="row" jc="between">
        {three}
        {four}
      </Box>
    </Box>
  )
}

type RecipeInfoSheetContentFormData = Record<
  "numberOfPersons" | "time" | "cookingTime" | "numberOfCalories",
  string
>

const RecipeInfoSheetContent: FC<{
  onSubmit: (s: RecipeInfoSheetContentFormData) => void
  onFocus: () => void
}> = ({ onSubmit, onFocus }) => {
  const numberOfPersonsFieldRef = useRef<TextInput>(null)
  const timeFieldRef = useRef<TextInput>(null)
  const cookingTimeFieldRef = useRef<TextInput>(null)
  const calorieFieldRef = useRef<TextInput>(null)

  const { control, handleSubmit } = useForm<RecipeInfoSheetContentFormData>()

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

  const recipeInfo: [
    MutableRefObject<TextInput>,
    keyof RecipeInfoSheetContentFormData,
    string,
  ][] = [
    [numberOfPersonsFieldRef, "numberOfPersons", " personnes"],
    [timeFieldRef, "time", " min de preparations"],
    [cookingTimeFieldRef, "cookingTime", " min de cuisson"],
    [calorieFieldRef, "numberOfCalories", " calories / personnes"],
  ]

  const [one, two, three, four] = recipeInfo.map(([ref, name, text]) => (
    <TouchableOpacity key={name} onPressOut={handleFocus(ref)} style={RECIPE_INFO_SHEET_ITEM}>
      <Box style={RECIPE_INFO_SHEET_ITEM_SHADOW}></Box>
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
  ))

  return (
    <Box style={RECIPE_INFO_SHEET} jc="around">
      <View>
        <Text text="Paramètres" style={RECIPE_INFO_SHEET_TITLE} />
        <Text
          text="Quantité, temps et calories pour cette fiche recette "
          style={RECIPE_INFO_SHEET_SUBTITLE}
        />
      </View>
      <Box jc="between" ai="center">
        <Box fd="row" jc="between" style={RECIPE_INFO_SHEET_ITEM_ROWS}>
          {one}
          {two}
        </Box>
        <Box fd="row" jc="between" style={{ ...RECIPE_INFO_SHEET_ITEM_ROWS, ...{ marginTop: 30 } }}>
          {three}
          {four}
        </Box>
      </Box>
      <Button preset="large" text="valider" onPress={handleSubmit(onSubmit)} />
    </Box>
  )
}
