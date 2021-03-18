import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Box, TextField, Button } from "../../components"
import { color, spacing } from "../../theme"
import { SignupFormData, SignupUserSchema } from "../../models/user/user"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import shadowViewStyle from "../../utils/shadow"
import Logo from "../../../assets/bookm.svg"

const ROOT: ViewStyle = {
  flexGrow: 1,
}

const HEADER: ViewStyle = {
  maxWidth: 200,
}

const CATCH_PHRASE: ViewStyle = {
  marginLeft: 20,
}

const BODY: ViewStyle = {
  ...shadowViewStyle(0, -1),
  flex: 1,
  marginTop: 32,
  paddingTop: 32,
  paddingHorizontal: 20,
  borderTopEndRadius: 70,
  borderTopLeftRadius: 70,
  backgroundColor: color.palette.white,
}
const TITLE: TextStyle = {
  textAlign: "center",
  marginBottom: 27,
}

const FORM: ViewStyle = {
  flex: 1,
}
const FORM_ROW: ViewStyle = {
  marginTop: spacing.mediumLarge,
}

const BUTTON: ViewStyle = {
  width: "100%",
}
const LOGO: ViewStyle & { color: string } = {
  color: color.primary,
}

const defaultValues = SignupUserSchema.cast(SignupUserSchema)

interface Props {
  onSubmit: (data: SignupFormData) => void
}

export const SignupTemplate = ({ onSubmit }: Props) => {
  const { control, handleSubmit, errors } = useForm<SignupFormData>({
    resolver: yupResolver(SignupUserSchema),
    defaultValues,
  })

  return (
    <Screen style={ROOT} preset="scroll" keyboardOffset={40}>
      <Box ai="center">
        <Box fd="row" jc="between" style={HEADER}>
          <Logo width={29} height={40} style={LOGO} />
          <View style={CATCH_PHRASE}>
            <Text preset="catchPhrase" text="Cuisinons de, " />
            <Text preset="catchPhrase" text="belles histoires " />
          </View>
        </Box>
      </Box>
      <View style={BODY}>
        <Text text="Inscrivez-vous" style={TITLE} />
        <Box jc="between" style={FORM}>
          <Box ai="center">
            <Controller
              control={control}
              name="username"
              render={({ value, onChange }) => {
                return (
                  <TextField
                    placeholder="e-mail"
                    value={value}
                    keyboardType="email-address"
                    onChangeText={onChange}
                    error={errors?.username?.message}
                  />
                )
              }}
            />
            <View style={FORM_ROW}>
              <Controller
                control={control}
                name="firstname"
                render={({ value, onChange }) => {
                  return (
                    <TextField
                      placeholder="prénom"
                      value={value}
                      onChangeText={onChange}
                      error={errors?.firstname?.message}
                    />
                  )
                }}
              />
            </View>
            <View style={FORM_ROW}>
              <Controller
                control={control}
                name="lastname"
                render={({ value, onChange }) => {
                  return (
                    <TextField
                      placeholder="nom"
                      value={value}
                      onChangeText={onChange}
                      error={errors?.lastname?.message}
                    />
                  )
                }}
              />
            </View>
            <View style={FORM_ROW}>
              <Controller
                control={control}
                name="password"
                render={({ value, onChange }) => {
                  return (
                    <TextField
                      secureTextEntry
                      textContentType={"oneTimeCode"}
                      placeholder="mot de passe"
                      value={value}
                      onChangeText={onChange}
                      error={errors?.password?.message}
                    />
                  )
                }}
              />
            </View>
            <View style={FORM_ROW}>
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ value, onChange }) => {
                  return (
                    <TextField
                      secureTextEntry
                      textContentType={"oneTimeCode"}
                      placeholder="vérification mot de passe"
                      value={value}
                      onChangeText={onChange}
                      error={errors?.passwordConfirmation?.message}
                    />
                  )
                }}
              />
            </View>
          </Box>
          <Button preset="large" text="Confirmer" style={BUTTON} onPress={handleSubmit(onSubmit)} />
        </Box>
      </View>
    </Screen>
  )
}
