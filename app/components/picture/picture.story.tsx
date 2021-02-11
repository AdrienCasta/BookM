import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story } from "../../../storybook/views"
import { Picture } from "./picture"

storiesOf("Picture", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Basic", () => (
    <Story>
      <Picture uri="https://images.unsplash.com/photo-1606441171708-6534789d2d95?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
    </Story>
  ))
  .add("Medium size", () => (
    <Story>
      <Picture
        variant="m"
        uri="https://images.unsplash.com/photo-1606441171708-6534789d2d95?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
      />
    </Story>
  ))
  .add("Large size", () => (
    <Story>
      <Picture
        variant="l"
        uri="https://images.unsplash.com/photo-1606441171708-6534789d2d95?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
      />
    </Story>
  ))
  .add("Long size", () => (
    <Story>
      <Picture
        variant="long"
        uri="https://images.unsplash.com/photo-1606441171708-6534789d2d95?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
      />
    </Story>
  ))
