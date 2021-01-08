import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Box } from "./box"
import { Text } from ".."

storiesOf("Box", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Horizontaly center">
        <Box jc="center">
          <Text text="hello" />
        </Box>
      </UseCase>
      <UseCase text="Horizontaly & verticaly center">
        <Box jc="center" ai="center">
          <Text text="hello" />
        </Box>
      </UseCase>
      <UseCase text="Horizontaly splitted">
        <Box jc="between" fd="row">
          <Text text="A" />
          <Text text="B" />
          <Text text="C" />
        </Box>
      </UseCase>
    </Story>
  ))
