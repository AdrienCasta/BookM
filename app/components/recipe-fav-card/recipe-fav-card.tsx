import * as React from "react"
import { ViewStyle } from "react-native"
import { Box } from "../box/box"
import LogoFire from "../../../assets/fire.svg"
import LogoCheck from "../../../assets/check.svg"
import { color } from "../../theme"

const CONTAINER: ViewStyle = {
  width: 69,
  height: 124,
  backgroundColor: color.primary,
  borderRadius: 9,
}
const ICON_CHECK: ViewStyle = {
  marginTop: 10,
}

export interface RecipeFavCardProps {}

export const RecipeFavCard = () => {
  return (
    <Box style={CONTAINER} jc="center" ai="center">
      <LogoFire width={22} height={31} color={color.secondary} />
      <LogoCheck width={22} height={31} color={color.secondary} style={ICON_CHECK} />
    </Box>
  )
}
