import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AppToast } from "./app-toast"

storiesOf("AppToast", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="AppToast" usage="Global App error, API call failure..  ">
        <AppToast text="Il semble y avoir une erreur dans les informations entrées... vérifiez, puis recommencez." />
      </UseCase>
    </Story>
  ))
