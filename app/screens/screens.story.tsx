import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen } from "../../storybook/views"
import { RecipePreviewTemplate } from "./recipe-preview/recipe.preview-template"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { IRecipeFieldValues } from "../models/recipe/recipe"

const noop = console.log

storiesOf("Screens", module)
  .addDecorator((fn) => (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StoryScreen>{fn()}</StoryScreen>
    </SafeAreaProvider>
  ))
  .add("RecipePreviewScreens", () => {
    const recipe: IRecipeFieldValues = {
      title: "Salade de kiwi",
      description:
        "Quem diligas quid efficere ad alterum sustinere ipse ad quantum L diligas fratrem P possis quidvis est possis etiam consulem etiam enim ille neque Scipio omnes P quem videndum   ",
      cookingTime: new Date(1217000),
      time: new Date(767000),
      numberOfPersons: 5,
      numberOfCalories: 58,
      ingredients: [
        {
          label: "Banane",
          image: { uri: "https://www.rts.ch/2017/11/29/10/11/9126687.image?&w=800&h=450" },
        },
        {
          label: "kiwi",
          image: {
            uri:
              "https://www.alimentarium.org/fr/system/files/thumbnails/image/alimentarium_kiwis.jpg",
          },
        },
      ],
      image: {
        uri:
          "https://images.unsplash.com/photo-1606441171708-6534789d2d95?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      },
      steps: [],
    }
    return <RecipePreviewTemplate recipe={recipe} author="Laura" onCookPress={noop} />
  })
