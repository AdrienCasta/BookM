import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Box, Button, Screen, Text, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

import Logo from "../../../assets/logo.svg"
import { TouchableOpacity } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const LOGO: ViewStyle = {
  marginBottom: 28,
}
const FORM: ViewStyle = {
  width: 233,
  paddingHorizontal: 30,
  paddingVertical: 18,
  backgroundColor: "#F7F7F7",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowColor: color.palette.black,
  shadowRadius: 2,
  borderRadius: 40,
  height: 200,
  marginVertical: 35,
}

export const SignInScreen = observer(function SignInScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigation = useNavigation()

  const handleSignUpScreenNavigation = () => {
    navigation.navigate("SignUpScreen")
  }

  const handleSignIn = async () => {
    user.signIn(username, password).catch(console.warn)
  }

  return (
    <Screen style={ROOT}>
      <Logo width={138} height={167} style={LOGO} />
      <Text preset="title">BOOKM</Text>
      <Text preset="catchPhrase">Être ensemble a bon goût</Text>
      <Box jc="between" style={FORM}>
        <TextField keyboardType="email-address" placeholder="e-mail" onChangeText={setUsername} />
        <TextField
          secureTextEntry
          textContentType={"oneTimeCode"}
          placeholder="mot de passe"
          onChangeText={setPassword}
        />
        <Button text="Confirmer" onPress={handleSignIn} />
      </Box>
      <Box fd="row">
        <Text>Vous n’avez pas de compte ? </Text>
        <TouchableOpacity onPress={handleSignUpScreenNavigation}>
          <Text preset="link">Inscrivez-vous</Text>
        </TouchableOpacity>
      </Box>
    </Screen>
  )
})
