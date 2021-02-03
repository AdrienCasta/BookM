import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { RecipeStockCard } from "./recipe-stock-card"

storiesOf("RecipeStockCard", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Basic" usage="Stock ui card">
        <RecipeStockCard />
      </UseCase>
      <UseCase text="Basic" usage="Stock ui card with error">
        <RecipeStockCard error />
      </UseCase>
    </Story>
  ))
