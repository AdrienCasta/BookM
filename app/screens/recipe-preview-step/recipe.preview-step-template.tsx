import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Box, Screen, Text } from "../../components"
import { Avatar } from "../../components/avatar/avatar"
import { RecipeFavCard } from "../../components/recipe-fav-card/recipe-fav-card"
import { RecipePreviewStep } from "../../components/recipe-preview-step/recipe-preview-step"
import { IRecipeFieldValues } from "../../models/recipe/recipe"
import { typography } from "../../theme"

const ROOT: ViewStyle = {
  flex: 1,
}

const SPACE: ViewStyle = {
  width: 16,
}
const STEPS_SPACE: ViewStyle = {
  height: 26,
}
const STEPS: ViewStyle = {
  width: 250,
}

const GO: TextStyle = {
  marginTop: 20,
  marginBottom: 13,
  textTransform: "uppercase",
  fontSize: 17,
  fontWeight: "700",
  textAlign: "center",
}
const TITLE: TextStyle = {
  fontFamily: typography.secondary,
  marginBottom: 27,
  fontSize: 15,
  fontWeight: "700",
  textAlign: "center",
}
const AUTHOR: TextStyle = {
  fontFamily: typography.secondary,
  fontSize: 13,
  textAlign: "center",
  marginBottom: 20,
}

interface RecipePreviewStepTemplateProps extends Pick<IRecipeFieldValues, "steps"> {
  title: string
  author: { firstname: string; image: { uri: string } }
  activeStepIndex?: number
}

export const RecipePreviewStepTemplate = (props: RecipePreviewStepTemplateProps) => {
  const { steps, author, activeStepIndex, title } = props
  return (
    <Screen style={ROOT} preset="scroll">
      <Text style={TITLE}>{title}</Text>
      <Text style={AUTHOR}>par {author.firstname}</Text>
      <Box fd="row" jc="center">
        <RecipeFavCard variant="compact" />
        <View style={SPACE} />
        <Avatar uri={author.image.uri} />
      </Box>
      <Text style={GO}>Go!</Text>
      <Box ai="center">
        <View style={STEPS}>
          {steps.map(({ description, trick }, index) => (
            <>
              {index > 0 && <View style={STEPS_SPACE} />}
              <RecipePreviewStep
                key={index}
                step={index + 1}
                instruction={description}
                trick={trick}
                active={activeStepIndex === index}
              />
            </>
          ))}
        </View>
      </Box>
    </Screen>
  )
}
