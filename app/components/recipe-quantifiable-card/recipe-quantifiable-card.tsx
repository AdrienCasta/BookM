import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { color } from "../../theme"
import { UnpackNestedValue } from "react-hook-form"
import { Text } from "../"
import { IRecipeFieldValues } from "../../models/recipe/recipe"
import { Box } from "../box/box"
import { recipeQuantifiablelIcons } from "../../utils/recipe"
import shadowViewStyle from "../../utils/shadow"

const RECIPE_INFO_PANEL_ERROR: ViewStyle = {
  borderWidth: 1,
  borderColor: color.error,
}

const RECIPE_INFO_PANEL_ITEM_TEXT: TextStyle = {
  color: color.background,
  fontWeight: "bold",
  fontSize: 11,
  paddingTop: 6,
}

const RECIPE_INFO_PANEL: ViewStyle = {
  ...shadowViewStyle(2, 4),
  backgroundColor: color.palette.orange,
  width: 124,
  height: 124,
  borderRadius: 8,
  padding: 16,
}

export interface RecipeQuantifiableCardProps {
  error: boolean
  values: UnpackNestedValue<
    Pick<IRecipeFieldValues, "cookingTime" | "time" | "numberOfCalories" | "numberOfPersons">
  >
}

export const RecipeQuantifiableCard: React.FC<RecipeQuantifiableCardProps> = ({
  error,
  values,
}) => {
  const displayValue = (name) => {
    if (!values[name]) {
      return "-"
    }
    if (name === "time" || name === "cookingTime") {
      return `${values[name].getUTCHours() ? values[name].getUTCHours() + "h" : ""} ${values[
        name
      ].getMinutes()} mn`
    }
    return values[name]
  }
  const [one, two, three, four] = Object.keys(values).map((name) => {
    const Icon = recipeQuantifiablelIcons.get(
      name as keyof Pick<
        IRecipeFieldValues,
        "time" | "cookingTime" | "numberOfCalories" | "numberOfPersons"
      >,
    )
    console.tron.log(typeof values[name], values[name])
    return (
      <Box key={name} ai="center">
        <Icon width={23} height={23} color={color.secondary} />
        <Text text={displayValue(name)} style={RECIPE_INFO_PANEL_ITEM_TEXT} />
      </Box>
    )
  })
  return (
    <Box
      jc="between"
      style={{
        ...RECIPE_INFO_PANEL,
        ...(error ? RECIPE_INFO_PANEL_ERROR : {}),
      }}
    >
      <Box fd="row" jc="between">
        {one}
        {two}
      </Box>
      <Box fd="row" jc="between">
        {three}
        {four}
      </Box>
    </Box>
  )
}
