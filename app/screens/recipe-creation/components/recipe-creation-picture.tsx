import React, { FC } from "react"
import { Control, Controller } from "react-hook-form"
import { ImageBackground, ViewStyle, View } from "react-native"
import { Box } from "../../../components"
import shadowViewStyle from "../../../utils/shadow"
import CameraIcon from "../assets/camera.svg"
import Gradient from "../assets/gradient.svg"
import { IRecipeFormData } from "../recipe-creation.share"

const PICTURE_HEIGHT = 267
const BORDER_RADIUS = 60

const BACKGROUND_IMAGE: ViewStyle = {
  borderBottomLeftRadius: BORDER_RADIUS,
  height: PICTURE_HEIGHT,
  overflow: "hidden",
}

const BACKGROUND_IMAGE_PLACEHOLDER: ViewStyle = {
  ...shadowViewStyle(0, 4),
  borderBottomLeftRadius: BORDER_RADIUS,
  height: PICTURE_HEIGHT,
}
const BACKGROUND_GRADIENT_CONTAINER: ViewStyle = {
  borderBottomLeftRadius: BORDER_RADIUS,
  position: "absolute",
  overflow: "hidden",
  zIndex: 8,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

const CAMERA_CONTAINER: ViewStyle = {
  height: "100%",
  left: 0,
  right: 0,
  position: "absolute",
  zIndex: 1,
  padding: 20,
}

interface IRecipeCreationPictureProps {
  control: Control<IRecipeFormData>
}

export const RecipeCreationPicture: FC<IRecipeCreationPictureProps> = ({ control }) => {
  return (
    <>
      <Box jc="end" ai="end" style={CAMERA_CONTAINER}>
        <CameraIcon width={43} height={30} />
      </Box>
      <Controller
        control={control}
        defaultValue={null}
        name="image"
        rules={{ required: true }}
        render={({ value }) => {
          return (
            <View style={BACKGROUND_IMAGE_PLACEHOLDER}>
              {!value?.uri ? (
                <View style={BACKGROUND_GRADIENT_CONTAINER}>
                  <Gradient height={PICTURE_HEIGHT} />
                </View>
              ) : (
                <ImageBackground source={{ uri: value.uri }} style={BACKGROUND_IMAGE} />
              )}
            </View>
          )
        }}
      />
    </>
  )
}
