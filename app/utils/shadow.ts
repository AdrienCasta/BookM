import { ViewStyle } from "react-native"
import { color } from "../theme"

const shadowViewStyle = (width = 0, height = 1): ViewStyle => ({
  backgroundColor: "#F7F7F7",
  shadowOffset: { width, height },
  shadowOpacity: 0.2,
  shadowColor: color.palette.black,
  shadowRadius: 2,
})

export default shadowViewStyle
