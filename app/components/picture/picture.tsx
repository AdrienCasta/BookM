import * as React from "react"
import { ImageStyle, View, ViewStyle, Image } from "react-native"
import { color } from "../../theme"
import shadowViewStyle from "../../utils/shadow"
import { combine } from "../../utils/style"

const PICTURE_L: ViewStyle = {
  width: 108,
  height: 108,
}
const PICTURE_M: ViewStyle = {
  width: 80,
  height: 80,
}
const PICTURE_LONG: ViewStyle = {
  ...PICTURE_M,
  height: 86,
  borderRadius: 10,
}
const PICTURE_L_IMAGE = PICTURE_L
const PICTURE_M_IMAGE = PICTURE_M
const PICTURE_LONG_IMAGE = PICTURE_LONG

const PICTURE: ViewStyle = {
  ...shadowViewStyle(0, 3),
  backgroundColor: color.secondary,
  borderRadius: 12,
  width: 53,
  height: 53,
}
const PICTURE_IMAGE: ImageStyle = {
  borderRadius: 12,
  width: 53,
  height: 53,
}

export interface PictureProps {
  variant?: "s" | "m" | "l" | "long"
  uri: string
}

export const Picture = (props: PictureProps) => {
  const { uri, variant = "s" } = props
  const pictureStyle = combine(
    PICTURE,
    variant === "m" && PICTURE_M,
    variant === "l" && PICTURE_L,
    variant === "long" && PICTURE_LONG,
  )
  const pictureImageStyle = combine(
    PICTURE_IMAGE,
    variant === "m" && PICTURE_M_IMAGE,
    variant === "l" && PICTURE_L_IMAGE,
    variant === "long" && PICTURE_LONG_IMAGE,
  )

  return (
    <View style={pictureStyle}>
      <Image style={pictureImageStyle} source={{ uri }} />
    </View>
  )
}

export default Picture
