import * as React from "react"
import { Alert } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Button } from "./button"

declare let module

storiesOf("Button", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary button.">
        <Button text="Click It" preset="primary" onPress={() => Alert.alert("pressed")} />
      </UseCase>
      <UseCase text="Large" usage="The large button.">
        <Button text="Click It" preset="large" onPress={() => Alert.alert("pressed")} />
      </UseCase>
    </Story>
  ))
