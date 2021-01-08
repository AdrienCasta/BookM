import React, { useReducer } from "react"
import { observer } from "mobx-react-lite"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Box, TextField, Button } from "../../components"
import {
  formStateReducer,
  formInitalState,
  setIdentifier,
  setFirstname,
} from "./register-screen.state"
import { spacing } from "../../theme"
const Logo = require("../../../assets/logo-xs.png")
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const ROOT: ViewStyle = {
  flex: 1,
  paddingTop: 67,
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
  borderWidth: 1,
  flex: 1,
  borderColor: "rgba(0,0,0,0.25)",
  backgroundColor: "#fff",
  shadowColor: "#000000",
  shadowOpacity: 0.5,
  shadowRadius: 1,
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

const FORM_ROW: ViewStyle = {
  marginTop: spacing.mediumLarge,
}
const BUTTON_WRAPPER: ViewStyle = {
  flex: 1,
}
const BUTTON: ViewStyle = {
  position: "absolute",
  bottom: 20,
  width: "100%",
}

export const RegisterScreen = observer(function RegisterScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [, dispatch] = useReducer(formStateReducer, formInitalState)

  const handleChange = (actionCreator) => (value: string) => {
    dispatch(actionCreator(value))
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
        <Box jc="center" ai="center">
          <TextField
            placeholder="mail / numéro de téléphone"
            onChangeText={handleChange(setIdentifier)}
          />
          <View style={FORM_ROW}>
            <TextField placeholder="prénom" onChangeText={handleChange(setFirstname)} />
          </View>
        </Box>
        <View style={BUTTON_WRAPPER}>
          <Button preset="large" text="Confirmer" style={BUTTON} />
        </View>
      </View>
    </Screen>
  )
})
