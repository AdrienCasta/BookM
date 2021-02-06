import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { Text } from "../"
import shadowViewStyle from "../../utils/shadow"
import { Box } from "../box/box"

const CONTAINER: ViewStyle = {
  ...shadowViewStyle(),
  padding: 10,
  borderRadius: 20,
}

const STEP_NUMBER_WRAPPER: ViewStyle = {
  marginBottom: 17,
}
const STEP_NUMBER: ViewStyle = {
  height: 22,
  paddingHorizontal: 12,
  backgroundColor: "#4F4F4F",
  marginBottom: 17,
  borderRadius: 100,
}
const STEP_NUMBER_TEXT: TextStyle = {
  fontSize: 10,
  color: color.secondary,
  fontWeight: "300",
}
const STEP_INSTRUCTION: TextStyle = {
  fontSize: 13,
  marginBottom: 10,
}
const STEP_INSTRUCTION_TRICK: TextStyle = {
  color: color.palette.blue,
}
const ACTIVE_STEP: TextStyle = {
  ...shadowViewStyle(),
  marginLeft: 5,
  backgroundColor: color.palette.green,
  borderRadius: 2,
  width: 8,
  height: 8,
}

export interface RecipePreviewStepProps {
  step: number
  instruction: string
  active: boolean
  trick?: string
}

/**
 * Describe your component here
 */
export const RecipePreviewStep = (props: RecipePreviewStepProps) => {
  const { step, trick, instruction, active } = props
  return (
    <View style={CONTAINER}>
      <Box style={STEP_NUMBER_WRAPPER} fd="row">
        <Box style={STEP_NUMBER} ai="center" jc="center" aself="start">
          <Text style={STEP_NUMBER_TEXT}>Etape {step}</Text>
        </Box>
        {active && <View style={ACTIVE_STEP} />}
      </Box>
      <Text style={STEP_INSTRUCTION}>{instruction}</Text>
      {trick && <Text style={STEP_INSTRUCTION_TRICK}>{trick}</Text>}
    </View>
  )
}
