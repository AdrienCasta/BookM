import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen } from "../../storybook/views"
import { RecipePreviewTemplate } from "./recipe-preview/recipe.preview-template"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { IRecipeFieldValues } from "../models/recipe/recipe"
import { RecipePreviewStepTemplate } from "./recipe-preview-step/recipe.preview-step-template"
import ProfilScreenTemplate from "./profile/profile-screen-template"
import { SignInScreenTemplate } from "./sign-in/sign-in-screen-template"
import { MyRecipesTemplate } from "./my-recipes/my-recipes-template"
// import { ProfileEditTemplate } from "./profile-edit/profile-edit-template"
import { SignupTemplate } from "./signup/signup-template"
import { RecipeCreationTemplate } from "./recipe-creation/recipe-creation-template"

const noop = console.log
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
      image: "https://www.rts.ch/2017/11/29/10/11/9126687.image?&w=800&h=450",
    },
    {
      label: "kiwi",
      image: "https://www.alimentarium.org/fr/system/files/thumbnails/image/alimentarium_kiwis.jpg",
    },
  ],
  image: {
    uri:
      "https://images.unsplash.com/photo-1606441171708-6534789d2d95?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  steps: [
    {
      description: "laver et couper vos tomates en 4",
      trick: "Personnelement j'utilise la fourchette.",
    },
    {
      description: "laver et couper vos tomates en 4",
      trick: undefined,
    },
  ],
}

const author = {
  firstname: "Laura",
  image: {
    uri:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  },
}

storiesOf("Screens", module)
  .addDecorator((fn) => (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StoryScreen>{fn()}</StoryScreen>
    </SafeAreaProvider>
  ))
  .add("RecipePreviewScreens", () => {
    return (
      <RecipePreviewTemplate
        recipe={recipe}
        author={author}
        onCookPress={noop}
        onPublish={noop}
        onGoBack={noop}
      />
    )
  })
  .add("RecipePreviewStepScreen", () => {
    return <RecipePreviewStepTemplate steps={recipe.steps} title={recipe.title} author={author} />
  })
  .add("ProfilScreen", () => {
    const recipeList = [1, 2, 3, 4, 5].map((v) => ({ image: recipe.image.uri, id: v + "" }))
    return (
      <ProfilScreenTemplate profile={author} recipeList={recipeList} onEditPress={console.log} />
    )
  })
  // .add("ProfilEditScreen", () => {
  //   const profile = {
  //     firstname: "Michel",
  //     lastname: "Terroire",
  //     tags: "trtr,trrt",
  //     picture:
  //       "https://bookmbucket92528-next.s3.us-east-2.amazonaws.com/public/67DEC767-7F82-4B22-9EEA-F4D607E46A7A.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA3QLQYFZSFMFSQKPJ%2F20210222%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210222T120110Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJHMEUCIHgIUa%2FzNb%2B3lYCmWy1RIW71ihXV6X8zYe9%2Bvw7a6gyTAiEAiC2iuZYkSiCvzAWwtHSjy06MKrZtflTvvkFmqt1GOLcqzQQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3OTEwNDczMTkxNDAiDH0sqyVjS05jKnGFcSqhBJkCM2cPv3raY%2FoBpJ7K%2FG%2FO2JU%2BFhKKGRkyHpTBmnD1pTXio8cE7BckdH80ZsaNJNMOejdBUlzNoze2Jg09KDIX2981yR9EcFYt8bo2vMxv%2FtOyqFqPtzoqn%2BlfaeIcCWz5IezhK6miTzeloLJfdUvUwm%2Fdrk20H52Cga%2B6rXo5cuWpNrWGFU0%2FqEJikBmzeenDaVZSNeIeOkaEm2pcIhphvQt0lvd1ZzGMV8X1utJ%2F4GCJpRcUcEjIPul%2FnCuokk4BttxIhnwHDXW0hJrQM6Mk9vZEp43ncBLeciSXdVP0wi9ywmGDwyexqKM3dUqUPXYS1c7n6YeDSuAiZX5OqAsM1oJTIU4iF947duVe2CcrS6CPmK7Td7LDh%2BtciqXvPkkxed5s2caTamMiIdh6Hnp7SK17%2BGBqzgYAoh%2Fmxe9BDW%2FE4C2eRUQEZj3c3dWZ1mbf59MP7tNJ7ykmnsoGYgXrmf5qGdwUnVx0VtCEEIikwbuIxpRRwFqpqpstSKfA1pVfslhTdE6YCQq%2F1khMg60TsoUx7jsngaoOKZID95x7g3VHcC62RmXWjSNaJZLaUhE%2FwyMAd7qA%2B50RgnMte0Bms2vu%2FCHfiR%2Fbigl4v%2FqmFeZEpuP5FfDVYusfykk3ZZOCiwYtlP1%2FjQS2r0urMspu4XPessnNOtRZIDV5kxEunYfZSRN1BU5SzfzlHhnMhi5KVJelxGTzsn42j5LSqUuVMIW6zoEGOoUCiW0mrhrqJ%2BK0rFaincllRSdtlPHbO87Q%2F64zcJFCnRCG0fzBlb4zFa3rC9Xjd1sy4aSwR%2FX%2FF2eZWEsMUX1%2B%2BMGYxKDX5fDOPLXOMC%2FWhDXRTX3bud4DhhSx7hn8DyxQsHS0AAdAj4IRK%2BKr9jWevoHmF25we7%2BE9aUBupINDJriNOy6Gi1tUVbMjK1zFzU1CzfEsXjThm8deaVCzCx1BP6zoPuFqiJV1eA2IEeMdfHFga0cvHJUTo36Irzlar2Cyzw2Q7WxSjqVySXF7icnGAOdwHlhtSWqoGYrkGv%2FOTyMbi%2FPzBotsfjPKju660nBRxljMWURMPtHsg5wR91hJN8P6iPV&X-Amz-Signature=84adb58f44127a64f0f841d9c135140c2d6752b6a0cc41f6d61432115d687c21&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js-v3-react-native-%40aws-sdk%2Fclient-s3%2F1.0.0-rc.4%20aws-amplify%2F3.8.8%20react-native&x-id=GetObject",
  //   }
  //   return <ProfileEditTemplate profile={profile} onEditCancel={noop} onSubmit={console.tron.log} />
  // })
  .add("SignInScreen", () => {
    return <SignInScreenTemplate onSignInSubmit={noop} onSignUpNavigation={noop} />
  })
  .add("MyRecipesScreen", () => {
    const recipeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => ({
      image: recipe.image.uri,
      id: v + "",
    }))
    return <MyRecipesTemplate onRecipePress={noop} recipes={recipeList} />
  })
  .add("SignupScreen", () => {
    return <SignupTemplate onSubmit={console.tron.log} />
  })
  .add("RecipeCreationScreen", () => {
    return <RecipeCreationTemplate onNavigation={noop} onSubmit={console.tron.log} />
  })
