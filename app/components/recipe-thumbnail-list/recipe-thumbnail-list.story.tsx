import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { RecipeThumbnailList } from "./recipe-thumbnail-list"

const recipes = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1613327902527-4948f907ad8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1613327902527-4948f907ad8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1613327902527-4948f907ad8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1613327902527-4948f907ad8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1613327902527-4948f907ad8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1613327902527-4948f907ad8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
]

storiesOf("RecipeThumbnailList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Basic", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <RecipeThumbnailList recipes={recipes} onItemPress={console.log} />
      </UseCase>
    </Story>
  ))
