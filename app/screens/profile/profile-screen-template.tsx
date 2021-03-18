import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Box, Screen, Text, Picture, RecipeThumbnailList } from "../../components"
import { UserSnapshot } from "../../models/user/user"
import { color, typography } from "../../theme"
import shadowViewStyle from "../../utils/shadow"
import { combine } from "../../utils/style"

interface Props {
  profile: UserSnapshot
  recipeList: { id: string; image: string }[]
  onEditPress: () => void
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
const RECIPES_TITLE: TextStyle = {
  ...TITLE,
  marginBottom: 26,
}

const INFO_STAT_SPACE: ViewStyle = {
  marginTop: 20,
}

const TAG: ViewStyle = {
  ...shadowViewStyle(),
  paddingVertical: 5,
  paddingHorizontal: 10,
  marginRight: 10,
  backgroundColor: color.palette.lighterGrey,
  borderRadius: 30,
}

const ProfilScreenTemplate = ({ profile, recipeList }: Props) => {
  const handleRecipeItemPress = () => {
    // todo
  }
  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <Box style={INFO} fd="row">
        <Picture variant="long" uri={profile.picture} />
        <View style={INFO_DATA_WRAPPER}>
          <Text text={profile.firstname} style={INFO_FIRSTNAME} />
          <Box style={INFO_DATA} fd="row" jc="between">
            <Box fd="row">
              <Text style={combine(INFO_DATA_ITEM, INFO_DATA_ITEM_BOLD)} text="0" />
              <Text style={INFO_DATA_ITEM} text="recettes" />
            </Box>
            <Box fd="row">
              <Text style={combine(INFO_DATA_ITEM, INFO_DATA_ITEM_BOLD)} text="0" />
              <Text style={INFO_DATA_ITEM} text="abonnés" />
            </Box>
            <Box fd="row">
              <Text style={combine(INFO_DATA_ITEM, INFO_DATA_ITEM_BOLD)} text="0" />
              <Text style={INFO_DATA_ITEM} text="abonnements" />
            </Box>
          </Box>
          <Text text={profile.description} style={DESCRIPTION} />
        </View>
      </Box>
      <View style={BEST_RECIPES}>
        {/* <Text text="Mes meilleurs recettes" style={BEST_RECIPES_TITLE} />
        <Box fd="row" ai="start">
          <Box jc="center" style={BEST_RECIPES_ITEM}>
            <View style={BEST_RECIPES_ITEM_SHADOW} />
            <Text text="Ajouter" style={BEST_RECIPE_ITEM_LABEL} />
          </Box>
          <Box jc="center" style={BEST_RECIPES_ITEM}>
            <View style={BEST_RECIPES_ITEM_SHADOW}>
              <Picture variant="s" uri={profile.picture} />
            </View>
            <Text text="Penne au pesto pistache" style={BEST_RECIPE_ITEM_LABEL} />
          </Box>
        </Box> */}
        <Text text="Mes recettes" style={RECIPES_TITLE} />
      </View>
      <RecipeThumbnailList recipes={recipeList} onItemPress={handleRecipeItemPress} />
      <View style={BEST_RECIPES}>
        <Text text="Statistiques" style={RECIPES_TITLE} />
        <Box fd="row">
          <Text style={combine(INFO_DATA_ITEM, INFO_DATA_ITEM_BOLD)} text={"0"} />
          <Text style={INFO_DATA_ITEM} text="cuisines partagés " />
        </Box>
        <Box fd="row" style={INFO_STAT_SPACE}>
          <Text style={combine(INFO_DATA_ITEM, INFO_DATA_ITEM_BOLD)} text={recipeList.length} />
          <Text style={INFO_DATA_ITEM} text="recettes BookM" />
        </Box>
      </View>
      <View style={BEST_RECIPES}>
        <Text text="Mots clés culinaires" style={RECIPES_TITLE} />
        <Box fd="row">
          {profile.tags.split(",").map((value) => (
            <Box style={TAG} fd="row" key={value}>
              <Text text={value} />
            </Box>
          ))}
        </Box>
      </View>
    </Screen>
  )
}

export default ProfilScreenTemplate
