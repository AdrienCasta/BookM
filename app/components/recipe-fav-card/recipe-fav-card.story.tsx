import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story } from "../../../storybook/views"
import { RecipeFavCard } from "./recipe-fav-card"

storiesOf("RecipeFavCard", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("added to fav", () => (
    <Story>
      <RecipeFavCard />
    </Story>
  ))
