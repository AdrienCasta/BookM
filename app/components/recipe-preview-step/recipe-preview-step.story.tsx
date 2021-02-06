import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { RecipePreviewStep } from "./recipe-preview-step"

storiesOf("RecipePreviewStep", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Basic", () => (
    <Story>
      <UseCase text="With trick">
        <RecipePreviewStep
          step={1}
          instruction="laver et couper vos tomates en 4"
          trick="Personnelement j'utilise la fourchette."
          active
        />
      </UseCase>
      <UseCase text="Without trick">
        <RecipePreviewStep step={1} instruction="laver et couper vos tomates en 4" active />
      </UseCase>
      <UseCase text="No active">
        <RecipePreviewStep step={1} instruction="laver et couper vos tomates en 4" active={false} />
      </UseCase>
    </Story>
  ))
