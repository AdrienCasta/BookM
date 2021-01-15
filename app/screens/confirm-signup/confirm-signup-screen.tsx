import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  TextInput,
  TextStyle,
  StyleProp,
  Image,
  View,
  ImageStyle,
  Keyboard,
} from "react-native"
import { Box, Button, Screen, Text } from "../../components"
import { color } from "../../theme"
import { Shadow } from "react-native-neomorph-shadows"
import { FixedArray } from "../../utils/storage/type"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
const Logo = require("../../../assets/logo-xs.png")

const ROOT: ViewStyle = {
  flex: 1,
  alignItems: "center",
  paddingHorizontal: 20,
}
const HEADER: ViewStyle = {
  maxWidth: 200,
  marginBottom: 20,
}

const HEADER_BOLD_TEXT: TextStyle = {
  marginTop: 5,
}

const LOGO: ImageStyle = {
  marginRight: 22,
}

const SHADOW: ViewStyle = {
  width: 33,
  height: 52,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.25,
  shadowColor: color.palette.black,
  shadowRadius: 8,
  backgroundColor: "#E8E8E8",
  borderRadius: 12,
}

const LINK: TextStyle = {
  marginTop: 20,
  marginBottom: 47,
}

const FORM: ViewStyle = {
  flex: 1,
}

const FIELD: StyleProp<TextStyle> = {
  flex: 1,
  justifyContent: "center",
  textAlign: "center",
  fontSize: 24,
}

const BUTTON_WRAPPER: ViewStyle = {
  width: "100%",
}

const BUTTON: ViewStyle = {
  width: "100%",
  shadowColor: color.palette.black,
  shadowOpacity: 0.4,
  shadowRadius: 1,
  shadowOffset: {
    height: 4,
    width: 0,
  },
  marginBottom: 20,
}

type CodeIndexes = 0 | 1 | 2 | 3 | 4 | 5

const CODE_LENGTH = 6
const INITAL_CODE = ["", "", "", "", "", ""] as FixedArray<string, 6>

const flattenCode = (code: FixedArray<string, 6>) => code.reduce((acc, curr) => acc + curr, "")

export const ConfirmSignupScreen = observer(function ConfirmSignupScreen() {
  const { user } = useStores()
  const navigation = useNavigation()
  const [currentTextInputFocusIndex, setTextInputFocus] = useState<CodeIndexes>(0)
  const [code, setCode] = useState<FixedArray<string, 6>>(INITAL_CODE)

  const textInputRefs = [...Array(CODE_LENGTH)].map(() => useRef<TextInput>())

  const handeTextChangeAt = (index: CodeIndexes) => (value: string) => {
    setCode((code) => code.map((c, i) => (index === i ? value : c)) as typeof code)
  }

  const handleFocusAt = (index: CodeIndexes) => () => {
    setCode((code) => code.map((c, i) => (index === i ? "" : c)) as typeof code)
    setTextInputFocus(index)
  }

  useEffect(() => {
    if (code[currentTextInputFocusIndex] !== "" && code[currentTextInputFocusIndex + 1] === "") {
      setTextInputFocus((currentTextInputFocusIndex + 1) as 1 | 2 | 3 | 4 | 5)
    }
  }, [code])

  useEffect(() => {
    textInputRefs[currentTextInputFocusIndex].current.focus()
  }, [currentTextInputFocusIndex])

  const handleConfirmSignupSubmit = async () => {
    const success = await user.confirmSignUp(flattenCode(code)).catch(() => {
      setCode(INITAL_CODE)
      setTextInputFocus(0)
    })
    if (success) {
      Keyboard.dismiss()
      navigation.navigate("SignInScreen")
    }
  }

  const Code = code.map((value, index) => {
    return (
      <Shadow key={index} inner useArt style={SHADOW as any}>
        <TextInput
          value={value}
          ref={textInputRefs[index]}
          keyboardType="number-pad"
          autoFocus={index === 0}
          onChangeText={handeTextChangeAt(index as CodeIndexes)}
          onFocus={handleFocusAt(index as CodeIndexes)}
          style={FIELD}
          maxLength={1}
        />
      </Shadow>
    )
  })

  return (
    <Screen style={ROOT}>
      <Box jc="center" style={FORM}>
        <View>
          <Box fd="row" ai="center" style={HEADER}>
            <Image source={Logo} style={LOGO} />
            <Text preset="catchPhrase" text="On y est presque" />
          </Box>
          <Text text="un mail vous a eté envoyé, " />
          <Text
            preset="bold"
            text="veuillez entrer le code à 6 chiffres"
            style={HEADER_BOLD_TEXT}
          />
        </View>
        <Text preset="link" text="cliquez ici si vous ne l’avez pas reçu" style={LINK} />
        <Box fd="row" jc="between">
          {Code}
        </Box>
      </Box>
      <View style={BUTTON_WRAPPER}>
        <Button
          preset="large"
          text="Confirmer"
          style={BUTTON}
          onPress={handleConfirmSignupSubmit}
        />
      </View>
    </Screen>
  )
})
