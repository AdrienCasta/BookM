import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { ContactCard } from "./contact-card"

storiesOf("Contact", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Basic", () => (
    <Story>
      <UseCase text="Contact card">
        <ContactCard
          imageUri="https://images.unsplash.com/photo-1613005341945-35e159e522f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          firstname="Laura"
          description="lorem ipsum"
          recipes={39}
        />
      </UseCase>
      <UseCase text="Contact card - olive">
        <ContactCard
          imageUri="https://images.unsplash.com/photo-1613005341945-35e159e522f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          firstname="Laura"
          description="lorem ipsum"
          recipes={39}
          theme="olive"
        />
      </UseCase>
      <UseCase text="Contact card - pink">
        <ContactCard
          imageUri="https://images.unsplash.com/photo-1613005341945-35e159e522f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          firstname="Laura"
          description="lorem ipsum"
          recipes={39}
          theme="pink"
        />
      </UseCase>
      <UseCase text="Contact card - blue">
        <ContactCard
          imageUri="https://images.unsplash.com/photo-1613005341945-35e159e522f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          firstname="Laura"
          description="lorem ipsum"
          recipes={39}
          theme="blue"
        />
      </UseCase>
    </Story>
  ))
