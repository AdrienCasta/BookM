/* eslint-disable react/display-name */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ViewStyle, TouchableOpacity, View } from "react-native"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Screen, Text, TextField } from "../../components"
import { RecipeCreationInfoBottomSheet } from "./components/recipe-creation-info-bottom-sheet"
import { reanimatedBottomSheet } from "./recipe-creation.share"
import { RecipeCreationStockBottomSheet } from "./components/recipe-creation-stock-bottom-sheet"
import RecipeCreationImagePickerBottomSheet from "./components/recipe-creation-image-picker-bottom-sheet"
import { StepsControl } from "./components/steps"
import { IRecipeFieldValues, RecipeSchema } from "../../models/recipe/recipe"
import { RecipeQuantifiableCard } from "../../components/recipe-quantifiable-card/recipe-quantifiable-card"
import { RecipeStockCard } from "../../components/recipe-stock-card/recipe-stock-card"
import { RecipePicture } from "../../components/recipe-picture/recipe-picture"

const ROOT: ViewStyle = {}
const BODY: ViewStyle = {
  paddingHorizontal: 50,
}
const FORM_FIELD: ViewStyle = {
  marginTop: 20,
}

const imageOptions = {
  mediaType: "photo",
  maxWidth: 600,
  maxHeight: 600,
} as ImageLibraryOptions

const fomatDuration = (duration: Date) => {
  if (!duration) {
    return ""
  }
  const mn = duration.getMinutes() > 9 ? duration.getMinutes() : `0${duration.getMinutes()}`
  const h = `${duration.getUTCHours() ? duration.getUTCHours() + ":" : "00:"}`
  return `${h}${mn}`
}

interface Props {
  onSubmit: (data: IRecipeFieldValues) => void
  navigation: any
}

export const RecipeCreationTemplate = ({ onSubmit, navigation }: Props) => {
  const [ingredientPreview, setIngredientPreview] = useState<ImagePickerResponse>(null)
  const { control, setValue, watch, handleSubmit, errors } = useForm<IRecipeFieldValues>({
    mode: "onChange",
    defaultValues: {
      ingredients: [{ image: "", label: "" }],
      steps: [
        { description: "", trick: "" },
        { description: "", trick: "" },
      ],
    },
    resolver: yupResolver(RecipeSchema),
  })
  const { fields, append } = useFieldArray({
    control,
    name: "steps",
  })
  const ingredients = useFieldArray({
    control,
    name: "ingredients",
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text text="Suivant" />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const recipeInfoSheetRef = useRef(null)
  const recipeStockSheetRef = useRef(null)
  const imagePickerSheetRef = useRef(null)
  const imageStockPickerSheetRef = useRef(null)
  const recipeInfoSheet = reanimatedBottomSheet(["100%", 460, 0], 2)
  const recipeStockSheet = reanimatedBottomSheet(["80%", 0], 1)
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
  const handleLaunchingCamera = () => {
    launchCamera(imageOptions, (image) => setValue("image", image))
  }
  const appendStockImageIngredient = () => {
    launchImageLibrary(imageOptions, (image) => setIngredientPreview(image))
  }
  const appendStockImageIngredientFromCamera = () => {
    launchCamera(imageOptions, (image) => setIngredientPreview(image))
  }

  return (
    <>
      <Screen style={ROOT} preset="scroll" unsafe>
        <TouchableOpacity onPress={handleImagePickerAppearance}>
          <RecipePicture control={control} error={!!errors.image} />
        </TouchableOpacity>
        <View style={BODY}>
          <View style={FORM_FIELD}>
            <Controller
              control={control}
              defaultValue=""
              name="title"
              render={({ value, onChange }) => (
                <TextField
                  error={errors?.title?.message}
                  value={value}
                  onChangeText={onChange}
                  label="Ajouter un titre"
                  placeholder="titre de votre recette"
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
                  error={errors?.description?.message}
                  helper="(205 caractères max)"
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
              <RecipeQuantifiableCard
                error={!!(errors.numberOfPersons || errors.time)}
                cookingTime={fomatDuration(watch("cookingTime"))}
                time={fomatDuration(watch("time"))}
                numberOfCalories={watch("numberOfCalories")}
                numberOfPersons={watch("numberOfPersons")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRecipeStockAppearance}>
              <RecipeStockCard error={!!errors.ingredients} />
            </TouchableOpacity>
          </Box>
          <StepsControl control={control} errors={errors} steps={fields} append={append} />
        </View>
      </Screen>
      <RecipeCreationInfoBottomSheet
        values={watch(["time", "cookingTime"])}
        sheetRef={recipeInfoSheetRef}
        control={control}
        setValue={setValue}
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
        onTakePhoto={appendStockImageIngredientFromCamera}
      />
    </>
  )
}
