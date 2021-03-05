import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AppToast } from "./app-toast"

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}
storiesOf("AppToast", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Basic", () => (
    <Story>
      <UseCase text="Error" usage="Global App error, API call failure..  ">
        <AppToast
          onContinue={noop}
          variant="error"
          text="Il semble y avoir une erreur dans les informations entrées... vérifiez, puis recommencez."
        />
      </UseCase>
      <UseCase text="Success" usage="So success">
        <AppToast onContinue={noop} variant="success" text="It's ok" />
      </UseCase>
    </Story>
  ))
