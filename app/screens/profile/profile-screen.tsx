import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"

import { useStores } from "../../models"
import ProfilScreenTemplate from "./profile-screen-template"
import { useNavigation } from "@react-navigation/native"

export const ProfileScreen = observer(function ProfilScreen() {
  // Pull in one of our MST stores
  const { user, recipeStore } = useStores()
  const navigation = useNavigation()

  useEffect(() => {
    recipeStore.listRecipes()
  }, [])

  const handleEditProfileScreennavigation = () => {
    navigation.navigate("ProfileEditScreen")
  }

  return (
    <ProfilScreenTemplate
      profile={user}
      recipeList={recipeStore.recipes}
      onEditPress={handleEditProfileScreennavigation}
    />
  )
})
