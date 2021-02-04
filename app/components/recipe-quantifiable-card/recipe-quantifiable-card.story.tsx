import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { RecipeQuantifiableCard } from "./recipe-quantifiable-card"

storiesOf("RecipeQuantifiableCard", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Basic" usage="Display quantifiable recipe info.">
        <RecipeQuantifiableCard
          {...{
            numberOfPersons: 7,
            time: new Date((2 * 3600 + 14 * 60) * 1000).getMinutes(),
            numberOfCalories: 70,
            cookingTime: new Date((2 * 3600 + 14 * 60) * 1000).getMinutes(),
          }}
        />
      </UseCase>
      <UseCase text="Error" usage="Display quantifiable recipe info with error.">
        <RecipeQuantifiableCard
          error
          {...{
            numberOfPersons: 7,
            time: new Date((2 * 3600 + 14 * 60) * 1000).getMinutes(),
            numberOfCalories: 70,
            cookingTime: new Date((2 * 3600 + 14 * 60) * 1000).getMinutes(),
          }}
        />
      </UseCase>
    </Story>
  ))
