import { FC, MutableRefObject } from "react"
import { SvgProps } from "react-native-svg"
import BottomSheetBehavior from "reanimated-bottom-sheet"
import { ImagePickerResponse } from "react-native-image-picker"
import UserIcon from "./assets/user.svg"
import PanIcon from "./assets/pan.svg"
import StopWatchIcon from "./assets/stopwatch.svg"
import FireIcon from "./assets/fire.svg"

export const recipeInfoIcons = new Map<keyof IRecipeInfoFormData, FC<SvgProps>>([
  ["numberOfPersons", UserIcon],
  ["time", StopWatchIcon],
  ["cookingTime", PanIcon],
  ["numberOfCalories", FireIcon],
])

export const reanimatedBottomSheet = (snapPoint, initialSnapPoint) => {
  return {
    initialSnapPoint,
    snapPoint,
    animate: (sheetRef: MutableRefObject<BottomSheetBehavior>) => {
      const snapTo = sheetRef?.current.snapTo
      const base = {
        slideTop: () => snapTo(0),
        slideDown: () => snapTo(1),
        slideMiddle: () => undefined,
      }

      if (snapPoint.length === 3) {
        return {
          ...base,
          slideMiddle: () => snapTo(1),
          slideDown: () => snapTo(2),
        }
      }
      return base
    },
  }
}

export interface IRecipeInfoFormData {
  numberOfPersons: number
  time: number
  cookingTime?: number
  numberOfCalories?: number
}
export interface IRecipeFormData extends IRecipeInfoFormData {
  image: any
  title: string
  description: string
  step1: string
  step2: string
  otherSteps?: { value: { description: string; trick?: string } }[]
  ingredients: { value: { image: ImagePickerResponse; label: string } }[]
}
