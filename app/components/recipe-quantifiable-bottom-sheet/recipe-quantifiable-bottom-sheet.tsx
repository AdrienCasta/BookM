import React, { FC, MutableRefObject } from "react"
import { TextStyle, ViewStyle, View, Keyboard, TouchableOpacity } from "react-native"
import BottomSheet from "reanimated-bottom-sheet"

import IconFire from "../../../assets/fire.svg"
import IconUser from "../../../assets/user.svg"
import IconTime from "../../../assets/stopwatch.svg"
import IconPan from "../../../assets/pan.svg"
import { IRecipeFieldValues } from "../../models/recipe/recipe"
import { combine } from "../../utils/style"
import shadowViewStyle from "../../utils/shadow"
import { reanimatedBottomSheet } from "../../screens/recipe-creation/recipe-creation.share"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { Box } from "../box/box"

const BORDER_TOP_RADIUS = 40
const HEADER_HEIGHT = 80
const PADDING = 20

const RECIPE_INFO_SHEET: ViewStyle = {
  transform: [{ translateY: -(HEADER_HEIGHT - PADDING) }],
  height: "100%",
  padding: PADDING,
}
const RECIPE_INFO_SHEET_CONTAINER: ViewStyle = {
  backgroundColor: color.background,
  paddingTop: HEADER_HEIGHT,
  height: "100%",
}
const RECIPE_INFO_SHEET_TITLE: TextStyle = {
  textAlign: "center",
  fontSize: 20,
  fontWeight: "bold",
  color: color.palette.orange,
  fontFamily: typography.secondary,
  paddingBottom: 12,
}
const RECIPE_INFO_SHEET_SUBTITLE: TextStyle = {
  textAlign: "center",
  fontSize: 13,
}

const RECIPE_INFO_SHEET_ITEM_TEXT: TextStyle = {
  fontWeight: "bold",
  fontSize: 13,
}
const RECIPE_INFO_SHEET_ITEM_TEXT_CONTAINER: ViewStyle = {
  position: "absolute",
  bottom: -PADDING,
  left: 0,
  right: 0,
}
const RECIPE_INFO_SHEET_ITEM_SHADOW: ViewStyle = {
  ...shadowViewStyle(-2, -1),
  height: 90,
  width: 90,
  backgroundColor: color.background,
  borderRadius: 20,
  marginBottom: 6,
}
const RECIPE_INFO_SHEET_ITEM_ROWS: ViewStyle = {
  width: 300,
}
const RECIPE_ITEM_PADDING: ViewStyle = {
  paddingHorizontal: 30,
}
const BOTTOMSHEET_HEADER: ViewStyle = {
  ...shadowViewStyle(0, -7),
  backgroundColor: color.background,
  paddingVertical: PADDING,
  height: HEADER_HEIGHT,
  borderTopLeftRadius: BORDER_TOP_RADIUS,
  borderTopRightRadius: BORDER_TOP_RADIUS,
}
const BOTTOMSHEET_HEADER_T: ViewStyle = {
  backgroundColor: color.palette.orange,
  opacity: 0.4,
  transform: [{ translateY: HEADER_HEIGHT - PADDING }],
  height: HEADER_HEIGHT,
  borderTopLeftRadius: BORDER_TOP_RADIUS,
  borderTopRightRadius: BORDER_TOP_RADIUS,
}

interface IName
  extends Pick<
    IRecipeFieldValues,
    "cookingTime" | "time" | "numberOfPersons" | "numberOfCalories"
  > {}

interface IRecipeQuantifiableBottomSheetProps extends Record<keyof IName, string> {
  sheetRef: MutableRefObject<BottomSheet>
  onPressItem: (name: keyof IName) => void
}
export const RecipeQuantifiableBottomSheet: FC<IRecipeQuantifiableBottomSheetProps> = ({
  sheetRef,
  numberOfPersons,
  numberOfCalories,
  time,
  cookingTime,
  onPressItem,
}) => {
  const recipeInfoSheet = reanimatedBottomSheet(["100%", 460, 0], 1)

  const handleItemPress = (name: keyof IName) => () => {
    onPressItem(name)
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={recipeInfoSheet.snapPoint}
      initialSnap={recipeInfoSheet.initialSnapPoint}
      onCloseStart={Keyboard.dismiss}
      renderHeader={() => (
        <>
          <View style={BOTTOMSHEET_HEADER_T}></View>
          <View style={BOTTOMSHEET_HEADER}>
            <Text text="Paramètres" style={RECIPE_INFO_SHEET_TITLE} />
            <Text
              text="Quantité, temps et calories pour cette fiche recette "
              style={RECIPE_INFO_SHEET_SUBTITLE}
            />
          </View>
        </>
      )}
      renderContent={() => (
        <View style={RECIPE_INFO_SHEET_CONTAINER}>
          <Box style={RECIPE_INFO_SHEET} jc="between">
            <Box jc="between" ai="center">
              <Box fd="row" jc="between" style={RECIPE_INFO_SHEET_ITEM_ROWS}>
                <TouchableOpacity
                  onPress={handleItemPress("numberOfPersons")}
                  style={RECIPE_ITEM_PADDING}
                >
                  <Box ai="center" jc="center" style={RECIPE_INFO_SHEET_ITEM_SHADOW}>
                    <IconUser width={56} height={55} color={color.palette.orange} />
                    <Box
                      fd="row"
                      jc="center"
                      ai="end"
                      style={RECIPE_INFO_SHEET_ITEM_TEXT_CONTAINER}
                    >
                      <Text text={numberOfPersons} style={RECIPE_INFO_SHEET_ITEM_TEXT} />
                    </Box>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleItemPress("time")} style={RECIPE_ITEM_PADDING}>
                  <Box ai="center" jc="center" style={RECIPE_INFO_SHEET_ITEM_SHADOW}>
                    <IconTime width={56} height={55} color={color.palette.orange} />
                    <Box
                      fd="row"
                      jc="center"
                      ai="end"
                      style={RECIPE_INFO_SHEET_ITEM_TEXT_CONTAINER}
                    >
                      <Text text={time} style={RECIPE_INFO_SHEET_ITEM_TEXT} />
                    </Box>
                  </Box>
                </TouchableOpacity>
              </Box>
              <Box
                fd="row"
                jc="between"
                style={combine(RECIPE_INFO_SHEET_ITEM_ROWS, { marginTop: 30 })}
              >
                <TouchableOpacity
                  onPress={handleItemPress("cookingTime")}
                  style={RECIPE_ITEM_PADDING}
                >
                  <Box ai="center" jc="center" style={RECIPE_INFO_SHEET_ITEM_SHADOW}>
                    <IconPan width={56} height={55} color={color.palette.orange} />
                    <Box
                      fd="row"
                      jc="center"
                      ai="end"
                      style={RECIPE_INFO_SHEET_ITEM_TEXT_CONTAINER}
                    >
                      <Text text={cookingTime} style={RECIPE_INFO_SHEET_ITEM_TEXT} />
                    </Box>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleItemPress("numberOfCalories")}
                  style={RECIPE_ITEM_PADDING}
                >
                  <Box ai="center" jc="center" style={RECIPE_INFO_SHEET_ITEM_SHADOW}>
                    <IconFire width={56} height={55} color={color.palette.orange} />
                    <Box
                      fd="row"
                      jc="center"
                      ai="end"
                      style={RECIPE_INFO_SHEET_ITEM_TEXT_CONTAINER}
                    >
                      <Text text={numberOfCalories} style={RECIPE_INFO_SHEET_ITEM_TEXT} />
                    </Box>
                  </Box>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </View>
      )}
    />
  )
}
