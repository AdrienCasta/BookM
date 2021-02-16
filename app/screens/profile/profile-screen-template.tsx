import React from "react"
import { TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import { Box, Screen, Text, Picture, RecipeThumbnailList } from "../../components"
import { color, typography } from "../../theme"
import shadowViewStyle from "../../utils/shadow"
import { combine } from "../../utils/style"

interface Props {
  recipes: number
  recipeList: { id: string; image: string }[]
  subscribers: number
  subscribtions: number
  description: string
  onEditPress: () => void
  author: {
    firstname: string
    image: Record<"uri", string>
  }
}

const ROOT: ViewStyle = {
  paddingHorizontal: 14,
}
const TITLE: TextStyle = {
  marginVertical: 20,
  fontFamily: typography.secondary,
  fontSize: 15,
  fontWeight: "bold",
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
  marginLeft: 20,
}
const BEST_RECIPES: ViewStyle = {
  paddingHorizontal: 40,
  marginTop: 7,
}
const BEST_RECIPES_TITLE: TextStyle = {
  ...TITLE,
  fontSize: 13,
  marginBottom: 27,
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
const BEST_RECIPE_ITEM_LABEL: TextStyle = {
  marginTop: 11,
  fontSize: 8,
  fontWeight: "300",
  textAlign: "center",
}
const RECIPES_TITLE: TextStyle = {
  ...TITLE,
  marginBottom: 26,
}

const INFO_STAT_SPACE: ViewStyle = {
  marginTop: 20,
}
const EDIT: TextStyle = {
  fontFamily: typography.secondary,
  fontWeight: "700",
}
const ProfilScreenTemplate = (props: Props) => {
  const {
    recipeList,
    recipes,
    subscribers,
    subscribtions,
    description,
    author,
    onEditPress,
  } = props

  const handleRecipeItemPress = () => {
    // todo
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Box fd="row" jc="end">
        <TouchableOpacity onPress={onEditPress}>
          <Text text="Modifier" style={EDIT} />
        </TouchableOpacity>
      </Box>
      <Box style={INFO} fd="row">
        <Picture variant="long" uri={author.image.uri} />
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
              <Picture variant="s" uri={author.image.uri} />
            </View>
            <Text text="Penne au pesto pistache" style={BEST_RECIPE_ITEM_LABEL} />
          </Box>
        </Box>
        <Text text="Mes recettes" style={RECIPES_TITLE} />
      </View>
      <RecipeThumbnailList recipes={recipeList} onItemPress={handleRecipeItemPress} />
      <View style={BEST_RECIPES}>
        <Text text="Statistiques" style={RECIPES_TITLE} />
        <Box fd="row">
          <Text style={combine(INFO_DATA_ITEM, INFO_DATA_ITEM_BOLD)} text={61} />
          <Text style={INFO_DATA_ITEM} text="cuisines partagés " />
        </Box>
        <Box fd="row" style={INFO_STAT_SPACE}>
          <Text style={combine(INFO_DATA_ITEM, INFO_DATA_ITEM_BOLD)} text={151} />
          <Text style={INFO_DATA_ITEM} text="recettes BookM" />
        </Box>
      </View>
    </Screen>
  )
}

export default ProfilScreenTemplate
