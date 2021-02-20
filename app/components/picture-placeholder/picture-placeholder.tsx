import React, { FC } from "react"
import { Control, Controller } from "react-hook-form"
import { ImageBackground, ViewStyle, View } from "react-native"
import { color } from "../../theme"
import shadowViewStyle from "../../utils/shadow"
import { combine } from "../../utils/style"
import CameraIcon from "../../screens/recipe-creation/assets/camera.svg"
import Gradient from "../../screens/recipe-creation/assets/gradient.svg"
import { Box } from "../box/box"

const PICTURE_HEIGHT_RECIPE = 267
const PICTURE_HEIGHT = 150
const BORDER_RADIUS_RECIPE = 60

const BACKGROUND_IMAGE: ViewStyle = {
  borderRadius: 10,
  height: PICTURE_HEIGHT,
  width: 150,
  overflow: "hidden",
}

const BACKGROUND_IMAGE_PLACEHOLDER: ViewStyle = {
  ...shadowViewStyle(0, 4),
  borderRadius: 10,
  height: PICTURE_HEIGHT,
  width: 150,
}
const BACKGROUND_IMAGE_PLACEHOLDER_ERROR: ViewStyle = {
  borderWidth: 1,
  borderColor: color.error,
}
const BACKGROUND_GRADIENT_CONTAINER: ViewStyle = {
  position: "absolute",
  overflow: "hidden",
  zIndex: 8,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

const BACKGROUND_GRADIENT_CONTAINER_RECIPE: ViewStyle = {
  borderRadius: 0,
  borderBottomLeftRadius: BORDER_RADIUS_RECIPE,
}
const BACKGROUND_IMAGE_RECIPE: ViewStyle = {
  borderRadius: 0,
  borderBottomLeftRadius: BORDER_RADIUS_RECIPE,
  width: "100%",
  height: PICTURE_HEIGHT_RECIPE,
}
const BACKGROUND_IMAGE_PLACEHOLDER_RECIPE: ViewStyle = {
  borderRadius: 0,
  borderBottomLeftRadius: BORDER_RADIUS_RECIPE,
  height: PICTURE_HEIGHT_RECIPE,
  width: "100%",
}

const CAMERA_CONTAINER: ViewStyle = {
  height: "100%",
  left: 0,
  right: 0,
  position: "absolute",
  zIndex: 1,
  padding: 20,
}

interface IPicturePlaceholderProps {
  error?: boolean
  control?: Control
  uri?: string
  variant?: "profile" | "recipe"
  name?: string
}

export const PicturePlaceholder: FC<IPicturePlaceholderProps> = ({
  control,
  error,
  uri,
  name,
  variant = "profile",
}) => {
  if (!control) {
    return (
      <View
        style={combine(
          BACKGROUND_IMAGE_PLACEHOLDER,
          variant === "recipe" && BACKGROUND_IMAGE_PLACEHOLDER_RECIPE,
        )}
      >
        <ImageBackground
          source={{ uri }}
          style={combine(BACKGROUND_IMAGE, variant === "recipe" && BACKGROUND_IMAGE_RECIPE)}
        />
      </View>
    )
  }
  if (!name) {
    throw Error("`name` is required if controls has been provided")
  }
  return (
    <Controller
      control={control}
      defaultValue={null}
      name={name}
      render={({ value }) => {
        return (
          <View
            style={combine(
              combine(
                BACKGROUND_IMAGE_PLACEHOLDER,
                variant === "recipe" && BACKGROUND_IMAGE_PLACEHOLDER_RECIPE,
              ),
              error && BACKGROUND_IMAGE_PLACEHOLDER_ERROR,
            )}
          >
            <Box jc="end" ai="end" style={CAMERA_CONTAINER}>
              <CameraIcon width={43} height={30} />
            </Box>
            {!value ? (
              <View
                style={combine(
                  BACKGROUND_GRADIENT_CONTAINER,
                  variant === "recipe" && BACKGROUND_GRADIENT_CONTAINER_RECIPE,
                )}
              >
                <Gradient height={PICTURE_HEIGHT_RECIPE} />
              </View>
            ) : (
              <ImageBackground
                source={{ uri: value }}
                style={combine(BACKGROUND_IMAGE, variant === "recipe" && BACKGROUND_IMAGE_RECIPE)}
              />
            )}
          </View>
        )
      }}
    />
  )
}
