import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextInput, TextStyle, StyleProp } from "react-native"
import { Box, Screen } from "../../components"
import { color } from "../../theme"
import { Shadow } from "react-native-neomorph-shadows"
import { FixedArray } from "../../utils/storage/type"

const ROOT: ViewStyle = {
  flex: 1,
}

const SHADOW: ViewStyle = {
  width: 44,
  height: 68,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.25,
  shadowColor: color.palette.black,
  shadowRadius: 8,
  backgroundColor: "#E8E8E8",
  borderRadius: 14,
}
const FORM: ViewStyle = {
  flex: 1,
}

const FIELDSET: ViewStyle = {
  flex: 1,
  maxWidth: 224,
}

const FIELD: StyleProp<TextStyle> = {
  height: "100%",
  flex: 1,
  justifyContent: "center",
  textAlign: "center",
  fontSize: 24,
}

type CodeIndexes = 0 | 1 | 2 | 3

export const ConfirmSignupScreen = observer(function ConfirmSignupScreen() {
  const [currentTextInputFocusIndex, setTextInputFocus] = useState<CodeIndexes>(0)
  const [code, setCode] = useState<FixedArray<string, 4>>(["", "", "", ""])
  const textInputRefs = [
    useRef<TextInput>(),
    useRef<TextInput>(),
    useRef<TextInput>(),
    useRef<TextInput>(),
  ]

  const handeTextChangeAt = (index: CodeIndexes) => (value: string) => {
    setCode(
      (code) => code.map((c, i) => (index === i ? value : c)) as [string, string, string, string],
    )
  }

  const handleFocusAt = (index: CodeIndexes) => () => {
    setCode(
      (code) => code.map((c, i) => (index === i ? "" : c)) as [string, string, string, string],
    )
    setTextInputFocus(index)
  }

  useEffect(() => {
    if (code[currentTextInputFocusIndex] !== "" && code[currentTextInputFocusIndex + 1] === "") {
      setTextInputFocus((currentTextInputFocusIndex + 1) as 1 | 2 | 3)
    }
  }, [code])

  useEffect(() => {
    textInputRefs[currentTextInputFocusIndex].current.focus()
  }, [currentTextInputFocusIndex])

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
      <Box fd="row" jc="center" style={FORM}>
        <Box ai="center" fd="row" jc="between" style={FIELDSET}>
          {Code}
        </Box>
      </Box>
    </Screen>
  )
})
