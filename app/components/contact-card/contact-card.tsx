import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text, Picture } from ".."
import { color } from "../../theme"
import { combine } from "../../utils/style"
import { Box } from "../box/box"

const CONTAINER: ViewStyle = {
  paddingVertical: 25,
  paddingRight: 34,
  paddingLeft: 20,
  borderRadius: 40,
}

const TITLE: TextStyle = {
  fontSize: 20,
  marginBottom: 15,
}
const TEXT: TextStyle = {
  fontSize: 9,
}
const TEXT_BOLD: TextStyle = {
  marginTop: 15,
  fontWeight: "bold",
}

export interface ContactCardProps {
  imageUri: string
  firstname: string
  description: string
  recipes: number
  theme?: "grey" | "blue" | "olive" | "pink"
}

const themeColor = new Map([
  ["grey", color.palette.brownGrey],
  ["blue", color.palette.lighterBlue],
  ["olive", color.palette.olive],
  ["pink", color.palette.pink],
])

export const ContactCard = (props: ContactCardProps) => {
  const { imageUri, firstname, description, recipes, theme = "grey" } = props
  return (
    <Box
      style={combine(CONTAINER, { backgroundColor: themeColor.get(theme) })}
      fd="row"
      ai="center"
      jc="between"
    >
      <View>
        <Text style={TITLE}>{firstname}</Text>
        <Text style={TEXT}>{description}</Text>
        <Box fd="row" ai="end">
          <Text style={[TEXT, TEXT_BOLD]} text={recipes} />
          <Text style={TEXT} text=" recettes sur BookM" />
        </Box>
      </View>
      <Picture variant="l" uri={imageUri} />
    </Box>
  )
}
