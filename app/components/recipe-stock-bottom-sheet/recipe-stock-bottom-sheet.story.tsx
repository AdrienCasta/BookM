import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { RecipeStockBottomSheet } from "./recipe-stock-bottom-sheet"
import { Button } from "../button/button"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { Screen } from "../screen/screen"

const SheetWrapper = () => {
  const ref = React.useRef(null)
  const ingredients = [
    {
      label: "kiwi",
      image: {
        uri: "https://www.alimentarium.org/fr/system/files/thumbnails/image/alimentarium_kiwis.jpg",
      },
    },
    {
      label: "kiwidedededededed",
      image: {
        uri: "https://www.alimentarium.org/fr/system/files/thumbnails/image/alimentarium_kiwis.jpg",
      },
    },
  ]

  const handlePress = () => {
    ref?.current.snapTo(1)
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Screen>
        <Button onPress={handlePress} text="slide up !" />
        <RecipeStockBottomSheet ingredients={ingredients} sheetRef={ref} />
      </Screen>
    </SafeAreaProvider>
  )
}

storiesOf("--RecipeStockBottomSheet", module).add("Display mode", () => <SheetWrapper />)
