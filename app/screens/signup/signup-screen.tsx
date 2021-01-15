import React, { useReducer } from "react"
import { observer } from "mobx-react-lite"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Box, TextField, Button } from "../../components"
import {
  formStateReducer,
  formInitalState,
  setUsername,
  setFirstname,
  setFamilyname,
  setPassword,
  setPasswordConfirmation,
} from "./signup-screen.state"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
const Logo = require("../../../assets/logo-xs.png")

const ROOT: ViewStyle = {
  flex: 1,
  paddingTop: 67,
  paddingBottom: 20,
}

const HEADER: ViewStyle = {
  maxWidth: 200,
}

const CATCH_PHRASE: ViewStyle = {
  marginLeft: 20,
}

const BODY: ViewStyle = {
  marginTop: 32,
  paddingTop: 32,
  paddingHorizontal: 20,
  borderTopEndRadius: 70,
  borderTopLeftRadius: 70,
  flex: 1,
  backgroundColor: color.palette.white,
  shadowColor: color.palette.black,
  shadowOpacity: 0.2,
  shadowRadius: 2,
  shadowOffset: {
    height: -1,
    width: 0,
  },
  elevation: 5,
}
const TITLE: TextStyle = {
  textAlign: "center",
  marginBottom: 27,
}

const FORM: ViewStyle = {
  flex: 1,
}
const FORM_ROW: ViewStyle = {
  marginTop: spacing.mediumLarge,
}

const BUTTON: ViewStyle = {
  width: "100%",
}

export const SignupScreen = observer(function SignupScreen() {
  const navigation = useNavigation()

  const [
    { username, password, passwordConfirmation, firstname, familyname },
    dispatch,
  ] = useReducer(formStateReducer, formInitalState)

  const { user } = useStores()

  const handleStateChange = (actionCreator) => (value: string) => {
    dispatch(actionCreator(value))
  }

  const handleSignupSubmit = () => {
    const arefalsy = (v) => !v
    if ([username, familyname, firstname].some(arefalsy)) {
      return
    }
    if (password.length < 6 || password !== passwordConfirmation) {
      return
    }
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

  return (
    <Screen style={ROOT} preset="scroll">
      <Box ai="center">
        <Box fd="row" jc="between" style={HEADER}>
          <Image source={Logo} />
          <View style={CATCH_PHRASE}>
            <Text preset="catchPhrase" text="Cuisinons de, " />
            <Text preset="catchPhrase" text="belles histoires, " />
          </View>
        </Box>
      </Box>
      <View style={BODY}>
        <Text text="Inscrivez-vous" style={TITLE} />
        <Box jc="between" style={FORM}>
          <Box ai="center">
            <TextField
              placeholder="e-mail"
              keyboardType="email-address"
              onChangeText={handleStateChange(setUsername)}
            />
            <View style={FORM_ROW}>
              <TextField placeholder="prénom" onChangeText={handleStateChange(setFirstname)} />
            </View>
            <View style={FORM_ROW}>
              <TextField placeholder="nom" onChangeText={handleStateChange(setFamilyname)} />
            </View>
            <View style={FORM_ROW}>
              <TextField
                secureTextEntry
                textContentType={"oneTimeCode"}
                placeholder="mot de passe"
                onChangeText={handleStateChange(setPassword)}
              />
            </View>
            <View style={FORM_ROW}>
              <TextField
                secureTextEntry
                textContentType={"oneTimeCode"}
                placeholder="vérification mot de passe"
                onChangeText={handleStateChange(setPasswordConfirmation)}
              />
            </View>
          </Box>
          <Button preset="large" text="Confirmer" style={BUTTON} onPress={handleSignupSubmit} />
        </Box>
      </View>
    </Screen>
  )
})
