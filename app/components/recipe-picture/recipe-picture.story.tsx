import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { RecipePicture } from "./recipe-picture"

storiesOf("RecipePicture", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Display mode", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <RecipePicture uri="https://images.unsplash.com/photo-1612318079512-40892e233399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
      </UseCase>
    </Story>
  ))
