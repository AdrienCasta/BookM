import UserIcon from "../screens/recipe-creation/assets/user.svg"
import PanIcon from "../screens/recipe-creation/assets/pan.svg"
import StopWatchIcon from "../screens/recipe-creation/assets/stopwatch.svg"
import FireIcon from "../screens/recipe-creation/assets/fire.svg"
import { IRecipeFieldValues } from "../models/recipe/recipe"
import { FC } from "react"
import { SvgProps } from "react-native-svg"

export const recipeQuantifiablelIcons = new Map<
  keyof Pick<IRecipeFieldValues, "numberOfPersons" | "time" | "numberOfCalories" | "cookingTime">,
  FC<SvgProps>
>([
  ["numberOfPersons", UserIcon],
  ["time", StopWatchIcon],
  ["cookingTime", PanIcon],
  ["numberOfCalories", FireIcon],
])
