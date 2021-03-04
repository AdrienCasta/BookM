import React from "react"
import { observer } from "mobx-react-lite"
import { Keyboard } from "react-native"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { ConfirmSignupTemplate } from "./confirm-signup-template"

export const ConfirmSignupScreen = observer(function ConfirmSignupScreen() {
  const { user } = useStores()
  const navigation = useNavigation()

  const handleConfirmSignupSubmit = async (code) => {
    try {
      const success = await user.confirmSignUp(code)
      Keyboard.dismiss()
      navigation.navigate("SignInScreen")
      return success
    } catch (e) {
      throw Error
    }
  }
  return (
    <ConfirmSignupTemplate
      onSubmit={handleConfirmSignupSubmit}
      onResend={user.resendConfirmationCode}
    />
  )
})
