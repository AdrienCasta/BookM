import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { RecipeQuantifiableBottomSheet } from "./recipe-quantifiable-bottom-sheet"
import { View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { Button } from "../button/button"
import { Text } from "../text/text"

const WRAPPER_ROOT: ViewStyle = {
  height: 600,
  paddingBottom: 50,
}

const Test = () => {
  const ref = React.useRef(null)
  const [value, setValue] = React.useState(null)

  const handlePress = () => {
    ref?.current.snapTo(1)
  }

  return (
    <View style={WRAPPER_ROOT}>
      <Button onPress={handlePress} text="slide up !" />
      <Text text={value} />
      <RecipeQuantifiableBottomSheet
        numberOfCalories={"5"}
        numberOfPersons={"2"}
        time={"2h"}
        cookingTime={"2h"}
        sheetRef={ref}
        onPressItem={setValue}
      />
    </View>
  )
}

storiesOf("RecipeQuantifiableBottomSheet", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Bottom sheet", () => (
    <Story>
      <UseCase
        text="Playable recipe info bottom sheet"
        usage="Display mode"
        style={{ backgroundColor: color.palette.lightGrey }}
      >
        <Test />
      </UseCase>
    </Story>
  ))
