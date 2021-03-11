import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"

import { ProfileEditTemplate } from "./profile-edit-template"
import { useStores } from "../../models"

export const ProfileEditScreen = observer(function ProfileEditScreen() {
  const navigation = useNavigation()
  const { user, request } = useStores()
  const handleEditProfile = (data) => {
    user.edit(data)
  }
  const handleProfileScreenNavigation = () => {
    navigation.navigate("ProfileScreen")
  }

  useEffect(() => {
    if (request.status === "CONFIRMED") {
      navigation.navigate("ProfileScreen")
    }
  }, [request.status])

  return (
    <ProfileEditTemplate
      onEditCancel={handleProfileScreenNavigation}
      onSubmit={handleEditProfile}
      profile={user}
    />
  )
})
