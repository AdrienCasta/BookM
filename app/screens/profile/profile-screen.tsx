import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"

import { useStores } from "../../models"
import ProfilScreenTemplate from "./profile-screen-template"
import { useNavigation } from "@react-navigation/native"

const ObservalbleProfilScreenTemplate = observer(ProfilScreenTemplate)

export const ProfileScreen = () => {
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
    <ObservalbleProfilScreenTemplate
      profile={user}
      recipeList={recipeStore.recipes}
      onEditPress={handleEditProfileScreennavigation}
    />
  )
}
