import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Box } from "../box/box"
import LogoFire from "../../../assets/fire.svg"
import LogoCheck from "../../../assets/check.svg"
import { color } from "../../theme"
import { combine } from "../../utils/style"

const CONTAINER: ViewStyle = {
  width: 69,
  height: 124,
  backgroundColor: color.primary,
  borderRadius: 9,
}
const CONTAINER_COMPACT: ViewStyle = {
  width: 50,
  height: 50,
}
const SPACE: ViewStyle = {
  height: 10,
}

export interface RecipeFavCardProps {
  variant?: "compact" | "long"
}

export const RecipeFavCard = ({ variant = "long" }: RecipeFavCardProps) => {
  const isCompact = variant === "compact"
  const [checkWidth, checkHeight] = isCompact ? [9, 10] : [22, 32]
  return (
    <Box style={combine(CONTAINER, isCompact && CONTAINER_COMPACT)} jc="center" ai="center">
      <LogoFire width={22} height={31} color={color.secondary} />
      {isCompact && <View style={SPACE} />}
      <LogoCheck width={checkWidth} height={checkHeight} color={color.secondary} />
    </Box>
  )
}
