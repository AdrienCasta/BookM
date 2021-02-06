import * as React from "react"
import { Image, ImageStyle } from "react-native"

const AVATAR: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 10,
}

export interface AvatarProps {
  uri?: string
}

export const Avatar = (props: AvatarProps) => {
  const { uri } = props

  return <Image source={{ uri }} style={AVATAR} />
}
