import React from "react"
import { ViewStyle } from "react-native"
import BottomSheet from "reanimated-bottom-sheet"
import { Box, Button } from "../../../components"
import { reanimatedBottomSheet } from "../recipe-creation.share"

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

const RecipeCreationImagePickerBottomSheet = ({ sheetRef, onSelectPhoto, onTakePhoto }) => {
  const imagePickerSheet = reanimatedBottomSheet([165, 0], 1)
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={imagePickerSheet.snapPoint}
      initialSnap={imagePickerSheet.initialSnapPoint}
      borderRadius={40}
      renderContent={() => (
        <Box jc="between" style={ROOT_SHEET}>
          <Button
            onPress={onSelectPhoto}
            preset="large"
            style={BUTTON}
            text="Sélectionner une photo"
          />
          <Button onPress={onTakePhoto} preset="large" style={BUTTON} text="Prendre une photo" />
        </Box>
      )}
    />
  )
}

export default RecipeCreationImagePickerBottomSheet
