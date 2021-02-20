import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { BottomSheetPicturePicker } from "./bottom-sheet-picture-picker"
import { View, ViewStyle } from "react-native"
import { Button, Text } from ".."

const noop = () => ({})

const WRAPPER_ROOT: ViewStyle = {
  flex: 1,
}

const Test = () => {
  const ref = React.useRef(null)
  const [value] = React.useState(null)

  const handlePress = () => {
    ref?.current.snapTo(1)
  }

  return (
    <>
      <View style={WRAPPER_ROOT}>
        <Button onPress={handlePress} text="slide up !" />
        <Text text={value} />
      </View>
      <BottomSheetPicturePicker sheetRef={ref} onSelect={noop} onTake={noop} />
    </>
  )
}

storiesOf("BottomSheetPicturePicker", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <Test />
      </UseCase>
    </Story>
  ))
