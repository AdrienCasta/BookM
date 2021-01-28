import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  flex: 1,
}

export const RecipeListScreen = observer(function RecipeListScreen() {
  const { user } = useStores()

  useEffect(() => {
    user.listRecipes()
  }, [])
  return (
    <Screen style={ROOT} preset="scroll">
      {user.recipes.map((recipe, index) => {
        return <Text key={index} text={JSON.stringify(recipe, null, 2)} />
      })}
    </Screen>
  )
})
