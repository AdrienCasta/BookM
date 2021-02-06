import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, TextStyle } from "react-native"
import { Box, Screen, Text } from "../../components"
import { useStores } from "../../models"
// import { useNavigation } from "@react-navigation/native"
import LogoIcon from "../../../assets/logo.svg"
import CameraIcon from "./camera.svg"
import BurgerIcon from "./burger.svg"

const ROOT: ViewStyle = {
  flex: 1,
}
const HEADER: ViewStyle = {
  paddingHorizontal: 30,
}
const HEADER_TITLE: TextStyle = {
  fontSize: 20,
}
const LOGO: ViewStyle = {
  marginRight: 12,
}

export const HomeScreen = observer(function HomeScreen() {
  const { user } = useStores()

  const handleSignOut = () => {
    user.signOut()
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Box fd="row" jc="between" style={HEADER}>
        <CameraIcon />
        <Box fd="row">
          <LogoIcon width={35} height={41} style={LOGO} />
          <Box>
            <Text style={HEADER_TITLE} text="Bon retour, " />
            <Text style={HEADER_TITLE} text={user.firstname} />
          </Box>
        </Box>
        <TouchableOpacity>
          <BurgerIcon />
        </TouchableOpacity>
      </Box>
      <TouchableOpacity>
        <Text preset="link" text="déconnexion" onPress={handleSignOut} />
      </TouchableOpacity>
      {/* <Text preset="header" text={user.fullName} />
      <TouchableOpacity>
        <Text
          preset="link"
          text="recipe"
          onPress={() => navigation.navigate("RecipeCreationScreen")}
        />
      </TouchableOpacity> */}
      {/* <Box
        fd="row"
        style={{
          height: "100%",
          backgroundColor: "red",
          position: "absolute",
          left: "100%",
          right: 0,
          // transform: [{ translateX }],
        }}
      >
        <Box style={{ marginLeft: 12 }}>
          <Text style={{ fontSize: 20 }} text="Bon retour, " />
          <Text style={{ fontSize: 20 }} text={user.firstname} />
        </Box>
      </Box> */}
    </Screen>
  )
})
