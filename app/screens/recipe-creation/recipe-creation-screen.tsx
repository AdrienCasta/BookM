import React, { useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, TouchableOpacity, View } from "react-native"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker"
import { API, graphqlOperation, Storage } from "aws-amplify"
import BottomSheet from "reanimated-bottom-sheet"
import { Box, Button, Screen, Text, TextField } from "../../components"
import { color } from "../../theme"
import shadowViewStyle from "../../utils/shadow"
import * as mutations from "../../graphql/mutations"
import { RecipeCreationInfoBottomSheet } from "./components/recipe-creation-info-bottom-sheet"
import {
  IRecipeFormData,
  IRecipeInfoFormData,
  reanimatedBottomSheet,
  recipeInfoIcons,
} from "./recipe-creation.share"
import { RecipeCreationPicture } from "./components/recipe-creation-picture"

const ROOT: ViewStyle = {}
const BODY: ViewStyle = {
  paddingHorizontal: 20,
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

const IMAGE_PICKER_SHEET: ViewStyle = {
  backgroundColor: color.background,
  padding: 16,
  height: 450,
}

const BUTTON_ADD: ViewStyle = {
  backgroundColor: "#eee",
  flex: 1,
  height: 30,
  borderRadius: 30,
  marginTop: 30,
}

const imageOptions = {
  mediaType: "photo",
  maxWidth: 400,
} as ImageLibraryOptions

const createRecipe = async (recipeFormData: IRecipeFormData) => {
  try {
    const response = await fetch(recipeFormData.image.uri)
    const blob = (await response.blob()) as { _data: { name: string } }
    const fileName = blob._data.name

    await Storage.put(fileName, blob, {
      contentType: "image/jpeg",
    })
    await API.graphql(
      graphqlOperation(mutations.createRecipe, {
        input: {
          title: recipeFormData.title,
          description: recipeFormData.description,
          image: fileName,
          step1: {
            description: recipeFormData.step1,
          },
          step2: {
            description: recipeFormData.step2,
          },
          otherSteps: recipeFormData.otherSteps.map((description) => ({ description })),
        },
      }),
    )
  } catch (e) {
    throw Error(e)
  }
}

export const RecipeCreationScreen = observer(function RecipeCreationScreen() {
  const { control, setValue, watch, handleSubmit, errors } = useForm<IRecipeFormData>({
    mode: "onChange",
  })
  const { fields, append } = useFieldArray({
    control,
    name: "otherSteps",
  })

  const recipeInfoSheetRef = useRef(null)
  const imagePickerSheetRef = useRef(null)
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

  const onSubmit = (d) => createRecipe(d).catch(console.log)

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
          <RecipeCreationPicture control={control} />
        </TouchableOpacity>
        <View style={BODY}>
          <View style={FORM_FIELD}>
            <Controller
              control={control}
              defaultValue=""
              name="title"
              rules={{ required: true }}
              render={({ value, onChange }) => (
                <TextField
                  error={!!errors.title}
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
              rules={{ required: true }}
              render={({ value, onChange }) => (
                <TextField
                  error={!!errors.description}
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

          <View style={FORM_FIELD}>
            <Controller
              control={control}
              defaultValue=""
              name="step1"
              rules={{ required: true }}
              render={({ value, onChange }) => (
                <TextField
                  error={!!errors.step1}
                  preset="multiline"
                  scrollEnabled={false}
                  value={value}
                  multiline
                  onChangeText={onChange}
                  label="Étape 1 "
                  placeholder="Votre étape"
                />
              )}
            />
          </View>
          <View style={FORM_FIELD}>
            <Controller
              control={control}
              defaultValue=""
              name="step2"
              rules={{ required: true }}
              render={({ value, onChange }) => (
                <TextField
                  error={!!errors.step2}
                  preset="multiline"
                  scrollEnabled={false}
                  value={value}
                  multiline
                  onChangeText={onChange}
                  label="Étape 2"
                  placeholder="Votre étape"
                />
              )}
            />
          </View>
          {fields.map((field, index) => (
            <View style={FORM_FIELD} key={field.id}>
              <Controller
                control={control}
                defaultValue={field.value}
                name={`otherSteps[${index}].value`}
                rules={{ required: true }}
                render={({ value, onChange }) => (
                  <TextField
                    error={!!(errors.otherSteps && errors.otherSteps[index])}
                    preset="multiline"
                    scrollEnabled={false}
                    value={value}
                    multiline
                    onChangeText={onChange}
                    label={`Étape ${index + 3}`}
                    placeholder="Votre étape"
                  />
                )}
              />
            </View>
          ))}
          <TouchableOpacity onPress={() => append({ value: "" })}>
            <Box jc="center" ai="center" style={BUTTON_ADD}>
              <Text text="+ Ajouter" />
            </Box>
          </TouchableOpacity>
        </View>
        <Button preset="large" text="valider" onPress={handleSubmit(onSubmit)} />
      </Screen>
      <BottomSheet
        ref={imagePickerSheetRef}
        snapPoints={imagePickerSheet.snapPoint}
        initialSnap={imagePickerSheet.initialSnapPoint}
        borderRadius={10}
        renderContent={renderContent}
      />
      <RecipeCreationInfoBottomSheet
        sheetRef={recipeInfoSheetRef}
        onSubmit={handleRecipeInfoSubmit}
      />
    </>
  )
})

const RecipeInfo = ({ control }) => {
  const recipeInfoFormData: (keyof IRecipeInfoFormData)[] = [
    "numberOfPersons",
    "time",
    "cookingTime",
    "numberOfCalories",
  ]
  const [one, two, three, four] = recipeInfoFormData.map((name) => {
    const Icon = recipeInfoIcons.get(name)
    return (
      <Box key={name} ai="center">
        <Icon width={23} height={23} color={color.secondary} />
        <Controller
          defaultValue=""
          control={control}
          name={name}
          render={({ value }) => <Text text={value || "-"} style={RECIPE_INFO_PANEL_ITEM_TEXT} />}
        />
      </Box>
    )
  })
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
