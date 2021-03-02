import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Box } from "../box/box"
import LogoBookM from "../../../assets/bookm.svg"
import IconCheck from "../../../assets/check.svg"
import IconCheckSmall from "../../../assets/check-xs.svg"
import { color } from "../../theme"
import { combine } from "../../utils/style"
import shadowViewStyle from "../../utils/shadow"

const CONTAINER: ViewStyle = {
  width: 69,
  height: 124,
  borderRadius: 10,
  ...shadowViewStyle(0, 3),
  backgroundColor: color.primary,
}
const CONTAINER_COMPACT: ViewStyle = {
  width: 50,
  height: 50,
}
const SPACE: ViewStyle = {
  height: 10,
}
const LOGO_BOOKM: ViewStyle & { color: string } = {
  color: color.secondary,
}

export interface RecipeFavCardProps {
  variant?: "compact" | "long"
}

export const RecipeFavCard = ({ variant = "long" }: RecipeFavCardProps) => {
  const isCompact = variant === "compact"
  return (
    <Box style={combine(CONTAINER, isCompact && CONTAINER_COMPACT)} jc="center" ai="center">
      <LogoBookM width={22} height={31} style={LOGO_BOOKM} />
      {!isCompact && <View style={SPACE} />}
      {isCompact ? (
        <IconCheckSmall width={12} color={color.secondary} />
      ) : (
        <IconCheck width={22} height={32} color={color.secondary} />
      )}
    </Box>
  )
}
