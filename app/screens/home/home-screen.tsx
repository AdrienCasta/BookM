import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity } from "react-native"
import { Screen, Text } from "../../components"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  flex: 1,
}

export const HomeScreen = observer(function HomeScreen() {
  const { user } = useStores()

  const handleSignOut = () => {
    user.signOut()
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text={user.fullName} />
      <TouchableOpacity>
        <Text preset="link" text="déconnexion" onPress={handleSignOut} />
      </TouchableOpacity>
    </Screen>
  )
})
