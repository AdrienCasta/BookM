import React from "react"
import { Dimensions, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate } from "../../i18n"
import { Shadow } from "react-native-neomorph-shadows"
import { mergeAll, flatten } from "ramda"
import { Text } from "../text/text"
import { Box } from ".."

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  height: "100%",
  fontSize: 12,
  padding: spacing.medium,
  borderRadius: 20,
}
const SHADOW_ERROR: TextStyle = {
  borderColor: "red",
  borderWidth: 1,
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
const FIELD_HELPER: TextStyle = {
  color: color.palette.lighterGrey,
  fontSize: 7,
}
const FIELD_ERROR: TextStyle = {
  fontSize: 9,
  marginLeft: 12,
  marginTop: 6,
  color: color.error,
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
    paddingTop: 10,
    height: 77,
    width: 273,
  },
  multilineShort: {
    paddingTop: 10,
    height: 77,
    width: Dimensions.get("window").width * 0.56,
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
  helper?: string

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

  error?: string

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
    error = "",
    label,
    helper,
    ...rest
  } = props

  let inputStyle: TextStyle = INPUT
  inputStyle = mergeAll(
    flatten([inputStyle, PRESETS[preset] || PRESETS.default, inputStyleOverride]),
  )
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  const shadowStyle = {
    ...SHADOW,
    ...(PRESETS_SHADOW[preset] || PRESETS_SHADOW.default),
    ...(error ? SHADOW_ERROR : {}),
  }

  return (
    <View>
      <Box fd="row" ai="baseline">
        {label && <Text style={FIELD_LABEL} preset="fieldLabel" text={label} />}
        {helper && <Text style={FIELD_HELPER} text={helper} />}
      </Box>
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
      <Text style={FIELD_ERROR} text={error} />
    </View>
  )
}
