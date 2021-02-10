import React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Box, Screen, Text } from "../../components"
import { color, typography } from "../../theme"
import shadowViewStyle from "../../utils/shadow"
import { combine } from "../../utils/style"

interface Props {
  recipes: number
  subscribers: number
  subscribtions: number
  description: string
  author: {
    firstname: string
    image: Record<"uri", string>
  }
}

const ProfilScreenTemplate = (props: Props) => {
  const { recipes, subscribers, subscribtions, description, author } = props

  const ROOT: ViewStyle = {
    flex: 1,
    paddingHorizontal: 14,
  }
  const INFO: ViewStyle = {}
  const INFO_DATA: ViewStyle = {
    width: "100%",
  }
  const INFO_FIRSTNAME: TextStyle = {
    fontSize: 27,
    marginBottom: 10,
  }
  const INFO_DATA_ITEM: TextStyle = {
    fontSize: 12,
  }
  const INFO_DATA_ITEM_BOLD: TextStyle = {
    fontWeight: "700",
    marginRight: 3,
  }
  const DESCRIPTION: ViewStyle = {
    marginTop: 8,
  }
  const INFO_DATA_WRAPPER: ViewStyle = {
    flexShrink: 1,
  }
  const INFO_PROFIL_PICTURE: ImageStyle = {
    marginRight: 20,
    width: 80,
    height: 86,
    borderRadius: 10,
  }
  const BEST_RECIPES: ViewStyle = {
    paddingHorizontal: 40,
    marginTop: 30,
  }
  const BEST_RECIPES_TITLE: TextStyle = {
    fontFamily: typography.secondary,
    marginBottom: 27,
    fontWeight: "bold",
  }
  const BEST_RECIPES_ITEM: ViewStyle = {
    width: 60,
  }
  const BEST_RECIPES_ITEM_SHADOW: ViewStyle = {
    ...shadowViewStyle(0, 3),
    backgroundColor: color.secondary,
    borderRadius: 12,
    width: 53,
    height: 53,
  }
  const BEST_RECIPES_ITEM_IMAGE: ImageStyle = {
    borderRadius: 12,
    width: 53,
    height: 53,
  }
  const BEST_RECIPE_ITEM_LABEL: TextStyle = {
    marginTop: 11,
    fontSize: 8,
    fontWeight: "300",
    textAlign: "center",
  }
  const RECIPES_TITLE: TextStyle = {
    fontFamily: typography.secondary,
    marginTop: 20,
    marginBottom: 26,
    fontWeight: "bold",
    fontSize: 15,
  }

  const RECIPES_ITEM_SHADOW: ViewStyle = {
    ...shadowViewStyle(0, 3),
    backgroundColor: color.secondary,
    borderRadius: 12,
    width: 108,
    height: 108,
  }

  const RECIPES_ITEM_IMAGE: ImageStyle = {
    borderRadius: 12,
    width: 108,
    height: 108,
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Box style={INFO} fd="row">
        <Image style={INFO_PROFIL_PICTURE} source={{ uri: author.image.uri }} />
        <View style={INFO_DATA_WRAPPER}>
          <Text text={author.firstname} style={INFO_FIRSTNAME} />
          <Box style={INFO_DATA} fd="row" jc="between">
            <Box fd="row">
              <Text style={combine(INFO_DATA_ITEM, INFO_DATA_ITEM_BOLD)} text={recipes} />
              <Text style={INFO_DATA_ITEM} text="recettes" />
            </Box>
            <Box fd="row">
              <Text style={combine(INFO_DATA_ITEM, INFO_DATA_ITEM_BOLD)} text={subscribers} />
              <Text style={INFO_DATA_ITEM} text="abonnés" />
            </Box>
            <Box fd="row">
              <Text style={combine(INFO_DATA_ITEM, INFO_DATA_ITEM_BOLD)} text={subscribtions} />
              <Text style={INFO_DATA_ITEM} text="abonnements" />
            </Box>
          </Box>
          <Text text={description} style={DESCRIPTION} />
        </View>
      </Box>
      <View style={BEST_RECIPES}>
        <Text text="Mes meilleurs recettes" style={BEST_RECIPES_TITLE} />
        <Box fd="row" ai="start">
          <Box jc="center" style={BEST_RECIPES_ITEM}>
            <View style={BEST_RECIPES_ITEM_SHADOW} />
            <Text text="Ajouter" style={BEST_RECIPE_ITEM_LABEL} />
          </Box>
          <Box jc="center" style={BEST_RECIPES_ITEM}>
            <View style={BEST_RECIPES_ITEM_SHADOW}>
              <Image style={BEST_RECIPES_ITEM_IMAGE} source={{ uri: author.image.uri }} />
            </View>
            <Text text="Penne au pesto pistache" style={BEST_RECIPE_ITEM_LABEL} />
          </Box>
        </Box>
        <Text text="Mes recettes" style={RECIPES_TITLE} />
        <View>
          <View style={RECIPES_ITEM_SHADOW}>
            <Image style={RECIPES_ITEM_IMAGE} source={{ uri: author.image.uri }} />
          </View>
        </View>
      </View>
    </Screen>
  )
}

export default ProfilScreenTemplate
