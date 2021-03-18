import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { typography } from "../../theme"
import { Text, Button, Box } from "../"
import ToastError from "../../../assets/toast-error.svg"
import ToastSuccess from "../../../assets/toast-success.svg"

const CONTAINER: ViewStyle = {
  padding: 15,
  flex: 1,
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
const BUTTON: ViewStyle = {
  width: "100%",
}

export interface AppToastProps {
  text: string
  variant: "error" | "success"
  onContinue: () => void
}

/**
 * Describe your component here
 */
export const AppToast = observer(function AppToast(props: AppToastProps) {
  const { text, onContinue, variant = "error" } = props
  const Toast = variant === "error" ? ToastError : ToastSuccess

  return (
    <Box ai="center" jc="between" style={CONTAINER}>
      <Box ai="center">
        <Toast width={120} height={110} />
        <Text style={TITLE}>
          {variant === "error"
            ? "Les ingrédients ne sont pas bons..."
            : "Faites chauffer les plaques !"}
        </Text>
        <Text style={TEXT}>{text}</Text>
      </Box>
      <Button onPress={onContinue} preset="large" text="continuer" style={BUTTON} />
    </Box>
  )
})
