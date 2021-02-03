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
// import { API, graphqlOperation, Storage } from "aws-amplify"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Screen, Text, TextField } from "../../components"
import { color } from "../../theme"
// import * as mutations from "../../graphql/mutations"
import { RecipeCreationInfoBottomSheet } from "./components/recipe-creation-info-bottom-sheet"
import { reanimatedBottomSheet } from "./recipe-creation.share"
import { RecipeCreationPicture } from "./components/recipe-creation-picture"
import { RecipeCreationStockBottomSheet } from "./components/recipe-creation-stock-bottom-sheet"
import RecipeCreationImagePickerBottomSheet from "./components/recipe-creation-image-picker-bottom-sheet"
import CrossIcon from "../../../assets/cross.svg"
import { StepsControl } from "./components/steps"
import { IRecipeFieldValues, RecipeSchema } from "../../models/recipe/recipe"
import { useStores } from "../../models"
import { RecipeQuantifiableCard } from "../../components/recipe-quantifiable-card/recipe-quantifiable-card"
import { RecipeStockCard } from "../../components/recipe-stock-card/recipe-stock-card"

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
const FORM_FIELD: ViewStyle = {
  marginTop: 20,
}

const imageOptions = {
  mediaType: "photo",
  maxWidth: 600,
  maxHeight: 600,
} as ImageLibraryOptions

// const createRecipe = async (recipeFormData: IRecipeFieldValues) => {
//   const getImageUriFileName = (path: string) => path.substring(path.lastIndexOf("/") + 1)
//   try {
//     const fetches = await Promise.all(
//       [
//         recipeFormData.image.uri,
//         ...recipeFormData.ingredients.map(({ image }) => image.uri),
//       ].map((data) => fetch(data)),
//     )

//     for (const data of fetches) {
//       const blob = (await data.blob()) as { _data: { name: string } }
//       const fileName = blob._data.name

//       await Storage.put(fileName, blob, {
//         contentType: "image/jpeg",
//       })
//     }

//     const {
//       numberOfCalories,
//       numberOfPersons,
//       cookingTime,
//       time,
//       title,
//       description,
//       image,
//       ingredients,
//       steps,
//     } = recipeFormData

//     return await API.graphql(
//       graphqlOperation(mutations.createRecipe, {
//         input: {
//           title,
//           description,
//           image: getImageUriFileName(image.uri),
//           numberOfCalories,
//           numberOfPersons,
//           cookingTime,
//           time,
//           steps,
//           ingredients: ingredients.map(({ value: { image, label } }) => ({
//             image: getImageUriFileName(image.uri),
//             label,
//           })),
//         },
//       }),
//     )
//   } catch (e) {
//     throw Error(e)
//   }
// }

export const RecipeCreationScreen = observer(function RecipeCreationScreen() {
  const { user } = useStores()
  const navigation = useNavigation()
  const [ingredientPreview, setIngredientPreview] = useState<ImagePickerResponse>(null)
  const { control, setValue, watch, handleSubmit, errors } = useForm<IRecipeFieldValues>({
    mode: "onChange",
    defaultValues: {
      ingredients: [{ image: {}, label: "" }],
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

  const onSubmit = (recipe: IRecipeFieldValues) => {
    console.tron.logImportant(recipe)
    user.previewRecipe(recipe)
    // return
    // try {
    //   await createRecipe(recipe)
    //   // navigation.navigate("HomeScreen")
    // } catch (e) {
    //   console.log(JSON.stringify(e))
    // }
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
              <RecipeQuantifiableCard
                error={!!(errors.numberOfPersons || errors.time)}
                values={watch(["numberOfPersons", "time", "cookingTime", "numberOfCalories"])}
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
        onTakePhoto={handleLaunchingCamera}
      />
    </>
  )
})
