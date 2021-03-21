import React, { useState } from "react"
import { ViewStyle, TouchableOpacity, View, TextStyle } from "react-native"
import { Controller } from "react-hook-form"

import { Box, Text, TextField } from "../../../components"
import { color } from "../../../theme"

import PlusIcon from "../assets/plus.svg"
import ChevronIcon from "../../../../assets/chevron.svg"

const FORM_FIELD: ViewStyle = {
  marginTop: 10,
  width: "100%",
}

const BUTTON_ICON: ViewStyle = {
  padding: 14,
  backgroundColor: color.palette.lighterGrey,
  width: 30,
  height: 30,
  borderRadius: 6,
}
const BUTTON_CHEVRON: ViewStyle = {
  marginRight: 20,
}
const BUTTON_PLUS: ViewStyle = {
  transform: [{ translateX: -15 }],
}
const BUTTON_ADD: ViewStyle = {
  backgroundColor: color.palette.lighterGrey,
  flex: 1,
  height: 30,
  borderRadius: 30,
  marginTop: 30,
  marginBottom: 20,
}
const ICON: TextStyle = {
  color: color.palette.blue,
}
const LABEL: TextStyle = {
  fontSize: 13,
}
const LABEL_TRICK: TextStyle = {
  color: color.palette.blue,
  fontSize: 11,
}

const LABEL_HEADER: ViewStyle = {
  marginBottom: 7,
}
const FIELD_LABEL: TextStyle = {
  marginTop: 40,
}
const FIELD_HELPER: TextStyle = {
  color: color.palette.lighterGrey,
  fontSize: 7,
}

const combine = (...v: Record<string, any>[]) => v.reduce((a, c) => ({ ...a, ...(c || {}) }), {})

const StepControl = ({ control, value, errors, index }) => {
  const [trickVisibility, setTrickVisibility] = useState(false)
  const toggle = () => {
    setTrickVisibility((value) => !value)
  }
  return (
    <>
      <View style={FORM_FIELD}>
        <Box fd="row" jc="between" ai="center" style={LABEL_HEADER}>
          <Text text={`Etape ${index + 1}`} style={LABEL} />
          <Box ai="center">
            <Text text="Touches" style={LABEL_TRICK} />
            <Text text="personnelles" style={LABEL_TRICK} />
          </Box>
        </Box>
        <Box fd="row" ai="center" jc="between">
          {trickVisibility && (
            <TouchableOpacity onPress={toggle}>
              <Box jc="center" ai="center" style={combine(BUTTON_ICON, BUTTON_CHEVRON)}>
                <ChevronIcon width={10} height={20} style={ICON} onPress={toggle} />
              </Box>
            </TouchableOpacity>
          )}
          <Controller
            control={control}
            defaultValue={value.description}
            name={`steps[${index}].description`}
            render={({ value, onChange }) =>
              !trickVisibility && (
                <TextField
                  preset="multilineShort"
                  scrollEnabled={false}
                  value={value}
                  error={errors?.steps && errors.steps[index]?.description?.message}
                  multiline
                  onChangeText={onChange}
                  placeholder="Votre étape"
                />
              )
            }
          />
          <Controller
            control={control}
            defaultValue={value.trick}
            name={`steps[${index}].trick`}
            render={({ value, onChange }) =>
              trickVisibility && (
                <TextField
                  preset="multilineShort"
                  scrollEnabled={false}
                  value={value}
                  multiline
                  onChangeText={onChange}
                  placeholder="Vos touches personnelles"
                />
              )
            }
          />
          {trickVisibility === false && (
            <TouchableOpacity onPress={toggle}>
              <Box jc="center" ai="center" style={combine(BUTTON_ICON, BUTTON_PLUS)}>
                <PlusIcon width={14} height={14} style={ICON} />
              </Box>
            </TouchableOpacity>
          )}
        </Box>
      </View>
    </>
  )
}

export const StepsControl = function StepsControl({ control, errors, steps, append }) {
  return (
    <View>
      <Text
        style={FIELD_LABEL}
        preset="fieldLabel"
        text="Décris nous chaque nouvelle étape de ta fiche ?"
      />
      <Text style={FIELD_HELPER} text="(2 minimum)" />
      {steps.map((field, index) => (
        <StepControl control={control} value={field} index={index} errors={errors} key={index} />
      ))}
      <TouchableOpacity onPress={() => append({ description: "", trick: "" })}>
        <Box jc="center" ai="center" style={BUTTON_ADD}>
          <Text text="+ Ajouter" />
        </Box>
      </TouchableOpacity>
    </View>
  )
}
