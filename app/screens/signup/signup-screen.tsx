import React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { SignupTemplate } from "./signup-template"

export const SignupScreen = observer(function SignupScreen() {
  const navigation = useNavigation()
  const { user } = useStores()

  const handleSignupSubmit = ({ username, password, firstname, lastname: familyname }) => {
    user
      .signUp({
        username,
        password,
        attributes: {
          given_name: firstname,
          family_name: familyname,
        },
      })
      .then(() => {
        navigation.navigate("ConfirmSignupScreen")
      })
  }

  return <SignupTemplate onSubmit={handleSignupSubmit} />
})
