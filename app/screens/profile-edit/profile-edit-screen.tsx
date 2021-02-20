import React from "react"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"

import { ProfileEditTemplate } from "./profile-edit-template"

export const ProfileEditScreen = observer(function ProfileEditScreen() {
  const navigation = useNavigation()
  const handleEditProfile = () => {
    // todo
  }
  const handleProfileScreenNavigation = () => {
    navigation.navigate("ProfileScreen")
  }

  return (
    <ProfileEditTemplate
      onEditCancel={handleProfileScreenNavigation}
      onSubmit={handleEditProfile}
    />
  )
})
