import * as React from "react"
import { View, ViewStyle, StyleSheet, FlexAlignType } from "react-native"
import { observer } from "mobx-react-lite"

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse"
type FlexJustify =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"

export interface BoxProps {
  ai?: "baseline" | "center" | "end" | "start" | "stretch"
  aself?: "auto" | "baseline" | "center" | "end" | "start" | "stretch"
  children?: React.ReactNode
  jc?: "around" | "between" | "center" | "end" | "start" | "evenly"
  fd?: "column" | "column-reverse" | "row" | "row-reverse"
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const Box = observer(function Box({ style, children, ...props }: BoxProps) {
  return (
    <View style={[styles(props).box, style]} {...props}>
      {children}
    </View>
  )
})

const align: Record<string, FlexAlignType> = {
  baseline: "baseline",
  center: "center",
  end: "flex-end",
  start: "flex-start",
  stretch: "stretch",
}

const alignSelf: Record<string, FlexAlignType | "auto"> = {
  auto: "auto",
  baseline: "baseline",
  center: "center",
  end: "flex-end",
  start: "flex-start",
  stretch: "stretch",
}

const direction: Record<string, FlexDirection> = {
  column: "column",
  columnReverse: "column-reverse",
  row: "row",
  rowReverse: "row-reverse",
}

const justify: Record<string, FlexJustify> = {
  around: "space-around",
  between: "space-between",
  center: "center",
  end: "flex-end",
  evenly: "space-evenly",
  start: "flex-start",
}

const styles = (props: BoxProps) =>
  StyleSheet.create({
    box: {
      alignItems: align[props.ai] || "stretch",
      alignSelf: alignSelf[props.aself] || "auto",
      flexDirection: direction[props.fd] || "column",
      justifyContent: justify[props.jc] || "flex-start",
    },
  })
