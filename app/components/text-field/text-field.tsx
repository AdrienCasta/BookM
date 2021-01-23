import React from "react"
import { TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate } from "../../i18n"
import { Shadow } from "react-native-neomorph-shadows"
import { mergeAll, flatten } from "ramda"
import { Text } from "../text/text"

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  height: "100%",
  fontSize: 12,
  padding: spacing.medium,
  borderRadius: 20,
}

const SHADOW: Partial<ViewStyle> = {
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowColor: "black",
  shadowRadius: 4,
  borderRadius: 20,
  backgroundColor: color.palette.white,
  width: 180,
  height: 40,
}

const FIELD_LABEL: TextStyle = {
  marginBottom: 13,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
  multiline: {
    height: 77,
  },
}
const PRESETS_SHADOW: { [name: string]: ViewStyle } = {
  default: SHADOW,
  multiline: {
    height: 77,
    width: 273,
  },
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

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    preset = "default",
    placeholderTx,
    placeholder,
    inputStyle: inputStyleOverride,
    forwardedRef,
    label,
    ...rest
  } = props

  let inputStyle: TextStyle = INPUT
  inputStyle = mergeAll(
    flatten([inputStyle, PRESETS[preset] || PRESETS.default, inputStyleOverride]),
  )
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  const shadowStyle = { ...SHADOW, ...(PRESETS_SHADOW[preset] || PRESETS_SHADOW.default) }

  return (
    <>
      {label && <Text style={FIELD_LABEL} preset="fieldLabel" text={label} />}
      <Shadow inner useArt style={shadowStyle as any}>
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.palette.lighterGrey}
          underlineColorAndroid={color.transparent}
          {...rest}
          style={inputStyle}
          ref={forwardedRef}
        />
      </Shadow>
    </>
  )
}
