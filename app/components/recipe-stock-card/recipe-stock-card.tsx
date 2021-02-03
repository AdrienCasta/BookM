import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { color } from "../../theme"
import { Text } from "../"
import { Box } from "../box/box"
import shadowViewStyle from "../../utils/shadow"
import { combine } from "../../utils/style"

const STOCK: ViewStyle = {
  ...shadowViewStyle(),
  width: 65,
  height: 124,
  borderRadius: 9,
  backgroundColor: color.palette.lighterGreen,
}
const STOCK_ERROR: ViewStyle = {
  borderWidth: 1,
  borderColor: color.error,
}
const STOCK_BOTTOM: ViewStyle = {
  backgroundColor: color.palette.green,
  height: "50%",
  borderRadius: 9,
}
const STOCK_TEXT: TextStyle = {
  color: color.secondary,
}

export interface RecipeStockCardProps {
  error?: boolean
}

/**
 * Describe your component here
 */
export const RecipeStockCard = function RecipeStockCard({ error }: RecipeStockCardProps) {
  return (
    <Box jc="end" style={combine(STOCK, error && STOCK_ERROR)}>
      <Box jc="center" ai="center" style={STOCK_BOTTOM}>
        <Text text="STOCK" style={STOCK_TEXT} />
      </Box>
    </Box>
  )
}
