import React from "react"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"

import { SignInScreenTemplate } from "./sign-in-screen-template"

export const SignInScreen = observer(function SignInScreen() {
  const { user } = useStores()
  const navigation = useNavigation()
  const handleSignIn = ({ username, password }) => {
    user.signIn(username, password).catch(console.warn)
  }
  const handleSignUpScreenNavigation = () => {
    navigation.navigate("SignUpScreen")
  }

  return (
    <SignInScreenTemplate
      onSignInSubmit={handleSignIn}
      onSignUpNavigation={handleSignUpScreenNavigation}
    />
  )
})
