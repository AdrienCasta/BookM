import { ViewStyle, TextStyle } from "react-native"
import { color } from "../../theme"
import shadowViewStyle from "../../utils/shadow"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  ...shadowViewStyle(),
  backgroundColor: color.primary,
  paddingVertical: 12,
  paddingHorizontal: 20,
  maxWidth: 180,
  borderRadius: 999,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  color: color.secondary,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW } as ViewStyle,
  large: { ...BASE_VIEW, paddingVertical: 20, maxWidth: "100%" } as ViewStyle,
  ghostLarge: {
    ...BASE_VIEW,
    paddingVertical: 26,
    maxWidth: "100%",
    backgroundColor: color.secondary,
  } as ViewStyle,
}

export const textPresets = {
  primary: { ...BASE_TEXT, color: color.secondary, fontSize: 11 } as TextStyle,
  large: {
    ...BASE_TEXT,
    fontSize: 23,
  } as TextStyle,
  ghostLarge: {
    ...BASE_TEXT,
    fontSize: 23,
    color: color.palette.orange,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
