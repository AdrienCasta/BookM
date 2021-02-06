import * as React from "react"
import { Image, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { Box } from "../box/box"
const ToastError = require("../../../assets/toast-error.png")
const ToastSuccess = require("../../../assets/toast-success.png")

const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  shadowColor: color.palette.black,
  // shadowOpacity: 0.2,
  // shadowRadius: 2,
  // shadowOffset: {
  //   height: -2,
  //   width: 0,
  // },
  // elevation: 5,
  borderTopLeftRadius: 65,
  borderTopRightRadius: 65,
  padding: 15,
}

const TITLE: TextStyle = {
  fontFamily: typography.secondary,
  fontSize: 15,
  fontWeight: "bold",
  marginTop: 15,
  marginBottom: 30,
}
const TEXT: TextStyle = {
  textAlign: "center",
  lineHeight: 16,
  fontSize: 12,
  maxWidth: 280,
}

export interface AppToastProps {
  text: string
  variant: "error" | "success"
}

/**
 * Describe your component here
 */
export const AppToast = observer(function AppToast(props: AppToastProps) {
  const { text, variant = "error" } = props

  return (
    <Box ai="center" style={CONTAINER}>
      <Image source={variant === "error" ? ToastError : ToastSuccess} />
      <Text style={TITLE}>
        {variant === "error" ? "Les ingrédients sont pas bons..." : "Faites chauffer les plaques !"}
      </Text>
      <Text style={TEXT}>{text}</Text>
    </Box>
  )
})
