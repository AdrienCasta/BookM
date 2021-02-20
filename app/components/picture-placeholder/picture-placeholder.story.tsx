import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { PicturePlaceholder } from "./picture-placeholder"
import { useForm } from "react-hook-form"

const Form = ({ children }) => {
  const { control } = useForm({
    defaultValues: {
      recipe:
        "https://images.unsplash.com/photo-1613687940041-30f5776fb0b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
      profilePicture:
        "https://images.unsplash.com/photo-1613691028991-381d8931cfa3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    },
  })
  return children({ control })
}

storiesOf("PicturePlaceholder", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Basic", () => (
    <Story>
      <UseCase text="Profile" usage="For profile picture">
        <PicturePlaceholder uri="https://images.unsplash.com/photo-1612318079512-40892e233399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
      </UseCase>
      <UseCase text="Recipe" usage="For recipe picture">
        <PicturePlaceholder
          variant="recipe"
          uri="https://images.unsplash.com/photo-1612318079512-40892e233399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        />
      </UseCase>
      <UseCase text="Form controlled" usage="Edit profile picture with react-hook-form">
        <Form>
          {({ control }) => {
            return <PicturePlaceholder control={control} name="profilePicture" />
          }}
        </Form>
      </UseCase>
      <UseCase text="Form controlled" usage="Edit recipe picture with react-hook-form">
        <Form>
          {({ control }) => {
            return <PicturePlaceholder control={control} name="recipe" variant="recipe" />
          }}
        </Form>
      </UseCase>
    </Story>
  ))
