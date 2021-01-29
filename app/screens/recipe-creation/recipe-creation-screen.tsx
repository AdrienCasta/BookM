import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, TouchableOpacity, View } from "react-native"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker"
import { useNavigation } from "@react-navigation/native"
import { API, graphqlOperation, Storage } from "aws-amplify"
import { Box, Screen, Text, TextField } from "../../components"
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
import { RecipeCreationStockBottomSheet } from "./components/recipe-creation-stock-bottom-sheet"
import RecipeCreationImagePickerBottomSheet from "./components/recipe-creation-image-picker-bottom-sheet"
import CrossIcon from "../../../assets/cross.svg"

const ROOT: ViewStyle = {}
const HEADER: ViewStyle = {
  width: "100%",
  height: 40,
  paddingHorizontal: 20,
}
const CROSS_ICON: TextStyle = {
  color: color.primary,
}
const HEADER_TITLE: TextStyle = {
  fontSize: 20,
}
const BODY: ViewStyle = {
  paddingHorizontal: 50,
}
const RECIPE_INFO_PANEL: ViewStyle = {
  ...shadowViewStyle(2, 4),
  backgroundColor: color.palette.orange,
  width: 124,
  height: 124,
  borderRadius: 8,
  padding: 16,
}
const RECIPE_INFO_PANEL_ERROR: ViewStyle = {
  borderWidth: 1,
  borderColor: color.error,
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

const BUTTON_ADD: ViewStyle = {
  backgroundColor: "#eee",
  flex: 1,
  height: 30,
  borderRadius: 30,
  marginTop: 30,
}

const STOCK: ViewStyle = {
  ...shadowViewStyle(),
  width: 65,
  height: 124,
  borderRadius: 9,
  backgroundColor: color.palette.lighterGreen,
}
const STOCK_BOTTOM: ViewStyle = {
  backgroundColor: color.palette.green,
  height: "50%",
  borderRadius: 9,
}
const STOCK_TEXT: TextStyle = {
  color: color.secondary,
}

const imageOptions = {
  mediaType: "photo",
  maxWidth: 600,
  maxHeight: 600,
} as ImageLibraryOptions

const createRecipe = async (recipeFormData: IRecipeFormData) => {
  const getImageUriFileName = (path: string) => path.substring(path.lastIndexOf("/") + 1)
  try {
    const fetches = await Promise.all(
      [
        recipeFormData.image.uri,
        ...recipeFormData.ingredients.map(({ value: { image } }) => image.uri),
      ].map((data) => fetch(data)),
    )

    for (const data of fetches) {
      const blob = (await data.blob()) as { _data: { name: string } }
      const fileName = blob._data.name

      await Storage.put(fileName, blob, {
        contentType: "image/jpeg",
      })
    }

    const {
      numberOfCalories,
      numberOfPersons,
      cookingTime,
      time,
      title,
      description,
      image,
      ingredients,
      step1,
      step2,
      otherSteps,
    } = recipeFormData

    return await API.graphql(
      graphqlOperation(mutations.createRecipe, {
        input: {
          title,
          description,
          image: getImageUriFileName(image.uri),
          numberOfCalories,
          numberOfPersons,
          cookingTime,
          time,
          step1: {
            description: step1,
          },
          step2: {
            description: step2,
          },
          ...(otherSteps
            ? { otherSteps: otherSteps.map(({ value }) => ({ description: value })) }
            : {}),
          ingredients: ingredients.map(({ value: { image, label } }) => ({
            image: getImageUriFileName(image.uri),
            label,
          })),
        },
      }),
    )
  } catch (e) {
    throw Error(e)
  }
}

export const RecipeCreationScreen = observer(function RecipeCreationScreen() {
  const navigation = useNavigation()
  const [ingredientPreview, setIngredientPreview] = useState<ImagePickerResponse>(null)
  const { control, setValue, watch, handleSubmit, errors } = useForm<IRecipeFormData>({
    mode: "onChange",
  })
  const { fields, append } = useFieldArray({
    control,
    name: "otherSteps",
  })
  const ingredients = useFieldArray({
    control,
    name: "ingredients",
  })

  const recipeInfoSheetRef = useRef(null)
  const recipeStockSheetRef = useRef(null)
  const imagePickerSheetRef = useRef(null)
  const imageStockPickerSheetRef = useRef(null)
  const recipeInfoSheet = reanimatedBottomSheet(["100%", 460, 0], 2)
  const recipeStockSheet = reanimatedBottomSheet(["100%", 0], 1)
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
  const handleRecipeStockAppearance = () => {
    recipeStockSheet.animate(recipeStockSheetRef).slideTop()
  }
  const slideStockBottomSheetDown = () => {
    recipeStockSheet.animate(recipeStockSheetRef).slideDown()
  }

  const handleLaunchingImageLibrary = () => {
    launchImageLibrary(imageOptions, (image) => setValue("image", image))
  }
  const appendStockImageIngredient = () => {
    launchImageLibrary(imageOptions, (image) => setIngredientPreview(image))
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

  const onSubmit = async (recipe: IRecipeFormData) => {
    try {
      await createRecipe(recipe)
      navigation.navigate("HomeScreen")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Screen style={ROOT} preset="scroll">
        <Box fd="row" ai="center" jc="between" style={HEADER}>
          <TouchableOpacity onPress={() => navigation.navigate("MyBookMScreen")}>
            <CrossIcon width={12} height={12} style={CROSS_ICON} />
          </TouchableOpacity>
          <Text text="Nouvelle fiche" style={HEADER_TITLE} />
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text text="Suivant" />
          </TouchableOpacity>
        </Box>
        <TouchableOpacity onPress={handleImagePickerAppearance}>
          <RecipeCreationPicture control={control} error={!!errors.image} />
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
                  label="Ajouter un titre"
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
          <Box fd="row" jc="between" style={{ ...FORM_FIELD, ...{ paddingHorizontal: 20 } }}>
            <TouchableOpacity onPress={handleRecipeInfoAppearance}>
              <RecipeInfo control={control} error={errors} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRecipeStockAppearance}>
              <Box jc="end" style={STOCK}>
                <Box jc="center" ai="center" style={STOCK_BOTTOM}>
                  <Text text="STOCK" style={STOCK_TEXT} />
                </Box>
              </Box>
            </TouchableOpacity>
          </Box>

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
      </Screen>
      <RecipeCreationInfoBottomSheet
        sheetRef={recipeInfoSheetRef}
        onSubmit={handleRecipeInfoSubmit}
      />
      <RecipeCreationStockBottomSheet
        control={control}
        currentImagePicking={ingredientPreview}
        sheetRef={recipeStockSheetRef}
        snapPoints={recipeStockSheet.snapPoint}
        initialSnap={recipeStockSheet.initialSnapPoint}
        imageStockPickerSheetRef={imageStockPickerSheetRef}
        ingredients={ingredients}
        onSubmit={slideStockBottomSheetDown}
      />

      {/* Main image */}
      <RecipeCreationImagePickerBottomSheet
        sheetRef={imagePickerSheetRef}
        onSelectPhoto={handleLaunchingImageLibrary}
        onTakePhoto={handleLaunchingCamera}
      />
      {/* STOCK ingredients */}
      <RecipeCreationImagePickerBottomSheet
        sheetRef={imageStockPickerSheetRef}
        onSelectPhoto={appendStockImageIngredient}
        onTakePhoto={handleLaunchingCamera}
      />
    </>
  )
})

const RecipeInfo = ({ control, error }) => {
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
          rules={{ required: ["numberOfPersons", "time"].includes(name) }}
          defaultValue=""
          control={control}
          name={name}
          render={({ value }) => <Text text={value || "-"} style={RECIPE_INFO_PANEL_ITEM_TEXT} />}
        />
      </Box>
    )
  })
  return (
    <Box
      jc="between"
      style={{
        ...RECIPE_INFO_PANEL,
        ...(error.numberOfPersons || error.time ? RECIPE_INFO_PANEL_ERROR : {}),
      }}
    >
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
