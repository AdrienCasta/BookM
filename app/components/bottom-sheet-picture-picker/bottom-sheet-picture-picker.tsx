import React from "react"
import { ViewStyle } from "react-native"
import BottomSheet from "reanimated-bottom-sheet"
import { Box, Button } from "../"
import reanimatedBottomSheet from "../../utils/reanimatedBottomSheet"

const ROOT_SHEET: ViewStyle = {
  backgroundColor: "#5E5E5E",
  height: "100%",
  paddingHorizontal: 30,
  paddingVertical: 20,
}
const BUTTON: ViewStyle = {
  backgroundColor: "#828282",
  height: 55,
  paddingVertical: 0,
}

export const BottomSheetPicturePicker = ({ sheetRef, onSelect, onTake }) => {
  const imagePickerSheet = reanimatedBottomSheet([165, 0], 1)
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={imagePickerSheet.snapPoint}
      initialSnap={imagePickerSheet.initialSnapPoint}
      borderRadius={40}
      renderContent={() => (
        <Box jc="between" style={ROOT_SHEET}>
          <Button onPress={onSelect} preset="large" style={BUTTON} text="Sélectionner une photo" />
          <Button onPress={onTake} preset="large" style={BUTTON} text="Prendre une photo" />
        </Box>
      )}
    />
  )
}
