import { yupResolver } from "@hookform/resolvers/yup"
import React, { useRef, useEffect } from "react"
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { Alert, ViewStyle, TouchableOpacity, View, TextStyle } from "react-native"
import CrossIcon from "../../../assets/cross.svg"
import {
  Screen,
  Text,
  TextField,
  Box,
  PicturePlaceholder,
  BottomSheetPicturePicker,
} from "../../components"
import { UserFormData, UserSchema, UserSnapshot } from "../../models/user/user"
import { color } from "../../theme"
import reanimatedBottomSheet from "../../utils/reanimatedBottomSheet"
import shadowViewStyle from "../../utils/shadow"
import { useNavigation } from "@react-navigation/native"

const CONTAINER: ViewStyle = {
  paddingHorizontal: 54,
}
const PICTURE: ViewStyle = {
  marginTop: 72,
  marginBottom: 78,
}
const TAG_WRAPPER: ViewStyle = {
  marginRight: 10,
}
const TAG: ViewStyle = {
  ...shadowViewStyle(),
  paddingVertical: 5,
  paddingHorizontal: 10,
  backgroundColor: color.palette.lightGrey,
  borderRadius: 30,
}
const SPACE: ViewStyle = {
  height: 30,
}
const REMOVE_ICON: TextStyle = {
  color: color.secondary,
  alignSelf: "flex-end",
}
const REMOVE_ICON_WRAPPER: ViewStyle = {
  position: "absolute",
  right: -3,
  top: -3,
  paddingVertical: 2,
  paddingHorizontal: 4,
  borderRadius: 10,
  backgroundColor: color.palette.lighterGrey,
}

interface Props {
  onEditCancel: () => void
  onSubmit: (data: UserFormData) => void
  profile?: UserSnapshot
}
const defaultUserSchemaValues = UserSchema.cast(UserSchema)

const imageOptions = {
  mediaType: "photo",
  maxWidth: 300,
  maxHeight: 300,
} as ImageLibraryOptions

export const ProfileEditTemplate = ({ profile, onSubmit }: Props) => {
  const navigation = useNavigation()
  const defaultValues = {
    ...defaultUserSchemaValues,
    ...profile,
    tags: profile.tags.split(",").map((value) => ({ value })),
  }
  const { control, handleSubmit, errors, setValue, watch } = useForm<UserFormData>({
    resolver: yupResolver(UserSchema),
    defaultValues,
  })

  const { fields: tagFields, append, remove } = useFieldArray({
    control,
    name: "tags",
  })

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", ({ data }) => {
      if ((data.action.payload as { params: { save?: true } }).params?.save) {
        handleSubmit(onSubmit)()
      }
    })

    return unsubscribe
  }, [navigation])

  const imagePickerSheetRef = useRef(null)
  const imagePickerSheet = reanimatedBottomSheet([300, 0], 1)
  const handleImagePickerAppearance = () => {
    imagePickerSheet.animate(imagePickerSheetRef).slideTop()
  }
  useEffect(() => {
    imagePickerSheet.animate(imagePickerSheetRef).slideDown()
  }, [watch("image")])

  const handleImageLibraryLaunching = () => {
    launchImageLibrary(imageOptions, (image) => setValue("picture", image.uri))
  }
  const handleCameraLaunching = () => {
    launchCamera(imageOptions, (image) => setValue("picture", image.uri))
  }

  const handleTagAppending = () => {
    Alert.prompt("Entrez votre nouveau tag", "", (tagLabel) => append({ value: tagLabel }))
  }
  const handleTagRemoving = (index) => () => {
    remove(index)
  }

  return (
    <>
      <Screen preset="scroll" unsafe>
        {/* <Box fd="row" ai="center" jc="between" style={HEADER}>
          <TouchableOpacity onPress={onEditCancel}>
            <CrossIcon width={12} height={12} style={CROSS_ICON} />
          </TouchableOpacity>
          <Text text="Nouvelle fiche" style={HEADER_TITLE} />
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text text="terminer" />
          </TouchableOpacity>
        </Box> */}
        <View style={CONTAINER}>
          <Box ai="center" style={PICTURE}>
            <TouchableOpacity onPress={handleImagePickerAppearance}>
              <PicturePlaceholder control={control} name="picture" />
            </TouchableOpacity>
          </Box>
          <Controller
            control={control}
            name="firstname"
            render={({ value, onChange }) => {
              return (
                <TextField
                  value={value}
                  label="prenom"
                  placeholder="écrivez-ici"
                  onChangeText={onChange}
                  error={errors?.firstname?.message}
                />
              )
            }}
          />
          <View style={SPACE} />
          <Controller
            control={control}
            name="lastname"
            render={({ value, onChange }) => {
              return (
                <TextField
                  value={value}
                  label="nom"
                  placeholder="écrivez-ici"
                  onChangeText={onChange}
                  error={errors?.lastname?.message}
                />
              )
            }}
          />
          <View style={SPACE} />
          <Controller
            control={control}
            name="description"
            render={({ value, onChange }) => {
              return (
                <TextField
                  value={value}
                  scrollEnabled={false}
                  placeholder="Votre description"
                  multiline
                  preset="multiline"
                  label="Biographie"
                  onChangeText={onChange}
                  error={errors?.description?.message}
                />
              )
            }}
          />
          <View style={SPACE} />
          <Text preset="fieldLabel" text="Mots-clés culinaires" />
          <View style={SPACE} />
          <Box fd="row">
            {tagFields.length > 0 &&
              tagFields.map((field, index) => (
                <View key={field.id} style={TAG_WRAPPER}>
                  <TouchableOpacity onPress={handleTagRemoving(index)}>
                    <Controller
                      control={control}
                      name={`tags[${index}].value`}
                      defaultValue={field.value}
                      render={() => {
                        return (
                          <Box style={TAG} fd="row">
                            <Text text={field.value} />
                            <View style={REMOVE_ICON_WRAPPER}>
                              <CrossIcon width={8} height={8} style={REMOVE_ICON} />
                            </View>
                          </Box>
                        )
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            <TouchableOpacity onPress={handleTagAppending}>
              <Box style={TAG} aself="start">
                <Text text="Ajouter" />
              </Box>
            </TouchableOpacity>
          </Box>
        </View>
      </Screen>
      <BottomSheetPicturePicker
        sheetRef={imagePickerSheetRef}
        onSelect={handleImageLibraryLaunching}
        onTake={handleCameraLaunching}
      />
    </>
  )
}
