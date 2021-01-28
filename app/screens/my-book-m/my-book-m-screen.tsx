import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
  flex: 1,
}

export const MyBookMScreen = observer(function MyBookMScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <TouchableOpacity onPress={() => navigation.navigate("RecipeCreationScreen")}>
        <Text preset="link" text="create recipe" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RecipeListScreen")}>
        <Text preset="link" text="reciepe list" />
      </TouchableOpacity>
    </Screen>
  )
})
