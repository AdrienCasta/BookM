import React from "react"
import { TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate } from "../../i18n"
import { Shadow } from "react-native-neomorph-shadows"
import { mergeAll, flatten } from "ramda"

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  height: "100%",
  fontSize: 8,
  padding: spacing.small,
  borderRadius: 20,
}

const SHADOW: Partial<ViewStyle> = {
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.25,
  shadowColor: "grey",
  shadowRadius: 5,
  borderRadius: 20,
  backgroundColor: color.palette.white,
  width: 180,
  height: 40,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: string

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: string

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: ViewStyle | ViewStyle[]

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: TextStyle | TextStyle[]

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
}

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]))
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props

  let inputStyle: TextStyle = INPUT
  inputStyle = enhance(inputStyle, inputStyleOverride)
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <Shadow inner useArt style={SHADOW as any}>
      <TextInput
        placeholder={actualPlaceholder}
        placeholderTextColor={color.palette.lighterGrey}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={inputStyle}
        ref={forwardedRef}
      />
    </Shadow>
  )
}
