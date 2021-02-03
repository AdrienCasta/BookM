import { MutableRefObject } from "react"
import BottomSheetBehavior from "reanimated-bottom-sheet"

const reanimatedBottomSheet = (snapPoint: (number | string)[], initialSnapPoint: number) => {
  return {
    initialSnapPoint,
    snapPoint,
    animate: (sheetRef: MutableRefObject<BottomSheetBehavior>) => {
      const snapTo = sheetRef?.current.snapTo
      const base = {
        slideTop: () => snapTo(0),
        slideDown: () => snapTo(1),
        slideMiddle: () => undefined,
      }

      if (snapPoint.length === 3) {
        return {
          ...base,
          slideMiddle: () => snapTo(1),
          slideDown: () => snapTo(2),
        }
      }
      return base
    },
  }
}

export default reanimatedBottomSheet
