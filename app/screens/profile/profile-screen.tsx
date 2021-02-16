import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"

import { useStores } from "../../models"
import ProfilScreenTemplate from "./profile-screen-template"

const ROOT: ViewStyle = {}

export const ProfilScreen = observer(function ProfilScreen() {
  // Pull in one of our MST stores
  const { user, recipeStore } = useStores()

  useEffect(() => {
    recipeStore.listRecipes()
  }, [])

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const author = {
    ...user,
    image: {
      uri: "",
    },
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <ProfilScreenTemplate
        author={author}
        subscribers={0}
        subscribtions={0}
        description={""}
        recipes={recipeStore.recipes.length}
        recipeList={recipeStore.recipes}
        onEditPress={console.log}
      />
      <Text preset="header" text={JSON.stringify(user, null, 2)} />
      <Text preset="header" text={JSON.stringify(recipeStore, null, 2)} />
    </Screen>
  )
})
