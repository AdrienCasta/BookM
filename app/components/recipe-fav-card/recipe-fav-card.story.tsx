import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { RecipeFavCard } from "./recipe-fav-card"

storiesOf("RecipeFavCard", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Basic", () => (
    <Story>
      <UseCase text="Long mode">
        <RecipeFavCard />
      </UseCase>
      <UseCase text="Compact mode">
        <RecipeFavCard variant="compact" />
      </UseCase>
    </Story>
  ))
