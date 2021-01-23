import { TextStyle } from "react-native"
import { color, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: 15,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,
  title: {
    ...BASE,
    fontFamily: typography.secondary,
    fontWeight: "bold",
    fontSize: 55,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    shadowColor: color.primary,
  } as TextStyle,

  link: {
    ...BASE,
    color: color.link,
  } as TextStyle,

  catchPhrase: {
    ...BASE,
    fontSize: 15,
    lineHeight: 20,
  } as TextStyle,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  /**
   * Large headers.
   */
  header: {
    ...BASE,
    fontFamily: typography.secondary,
    fontSize: 20,
    fontWeight: "bold",
  } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontFamily: typography.secondary, fontSize: 13 } as TextStyle,

  /**
   * A smaller piece of secondard information.
   */
  secondary: { ...BASE, fontSize: 9, color: color.dim } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
