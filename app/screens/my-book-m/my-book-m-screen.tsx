import React from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Box, Screen, Text } from "../../components"
import CrossIcon from "../../../assets/cross.svg"
import ChevronIcon from "../../../assets/chevron.svg"
import LinkGradient from "./assets/gradient.svg"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  flex: 1,
}
const HEADER: ViewStyle = {
  width: "100%",
  height: 100,
  paddingHorizontal: 20,
}
const CROSS_ICON: TextStyle = {
  color: color.primary,
}

const LINK_LIST: ViewStyle = {
  paddingLeft: 50,
}
const LINK_LIST_ITEM: ViewStyle = {
  height: 55,
}
const CHEVRON: StyleProp<ViewStyle> & { color: string } = {
  color: "#efefef",
  paddingRight: 40,
}

export const MyBookMScreen = observer(function MyBookMScreen() {
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Box fd="row" ai="center" jc="between" style={HEADER}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <CrossIcon width={12} height={12} style={CROSS_ICON} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("RecipeCreationScreen")}>
          <Text text="Nouvelle fiche" />
        </TouchableOpacity>
      </Box>
      <View style={LINK_LIST}>
        <TouchableOpacity onPress={() => navigation.navigate("RecipeListScreen")}>
          <Box fd="row" ai="center" jc="between" style={LINK_LIST_ITEM}>
            <Text text="Mes listes de recettes" />
            <ChevronIcon style={CHEVRON} />
          </Box>
          <LinkGradient />
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
