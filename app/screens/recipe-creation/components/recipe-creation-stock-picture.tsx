import React, { FC } from "react"
import { ImageBackground, ViewStyle, View } from "react-native"
import { ImagePickerResponse } from "react-native-image-picker"
import { Box } from "../../../components"
import shadowViewStyle from "../../../utils/shadow"
import CameraIcon from "../assets/camera.svg"
import Gradient from "../assets/gradient.svg"

const PICTURE_HEIGHT = 122
const PICTURE_WIDTH = 122
const BORDER_RADIUS = 20

const BACKGROUND_IMAGE: ViewStyle = {
  borderRadius: BORDER_RADIUS,
  height: PICTURE_HEIGHT,
  width: PICTURE_WIDTH,
  overflow: "hidden",
}

const BACKGROUND_IMAGE_PLACEHOLDER: ViewStyle = {
  ...shadowViewStyle(0, 4),
  borderRadius: BORDER_RADIUS,
  height: PICTURE_HEIGHT,
  width: PICTURE_WIDTH,
}
const BACKGROUND_GRADIENT_CONTAINER: ViewStyle = {
  borderRadius: BORDER_RADIUS,
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
  width: PICTURE_WIDTH,
  left: 0,
  right: 0,
  position: "absolute",
  zIndex: 1,
  padding: 10,
}

interface IRecipeCreationStockPictureProps {
  preview: ImagePickerResponse
}

export const RecipeCreationStockPicture: FC<IRecipeCreationStockPictureProps> = ({ preview }) => {
  return (
    <View>
      <Box jc="end" ai="end" style={CAMERA_CONTAINER}>
        <CameraIcon width={43} height={30} />
      </Box>
      <View style={BACKGROUND_IMAGE_PLACEHOLDER}>
        {!preview?.uri ? (
          <View style={BACKGROUND_GRADIENT_CONTAINER}>
            <Gradient width={130} height={130} />
          </View>
        ) : (
          <ImageBackground source={{ uri: preview.uri }} style={BACKGROUND_IMAGE} />
        )}
      </View>
    </View>
  )
}
