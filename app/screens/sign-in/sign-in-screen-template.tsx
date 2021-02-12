import React from "react"
import { ViewStyle } from "react-native"
import { Asserts, object, string } from "yup"
import { Box, Button, Screen, Text, TextField } from "../../components"

import Logo from "../../../assets/logo.svg"
import shadowViewStyle from "../../utils/shadow"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const ROOT: ViewStyle = {
  alignItems: "center",
}

const LOGO: ViewStyle = {
  marginBottom: 80,
}
const FORM: ViewStyle = {
  width: 233,
  paddingHorizontal: 30,
  paddingVertical: 18,
  borderRadius: 40,
  height: 200,
  marginVertical: 35,
  ...shadowViewStyle(),
}

const formSchema = object({
  username: string()
    .email("Veuillez saissir un e-mail valide")
    .required("Veuillez saissir votre e-mail")
    .default(""),
  password: string().required("Veuillez saissir un mot de passe").default(""),
})
const formSchemaDefaultValues = formSchema.cast(formSchema)

interface Props {
  onSignInSubmit: ({ username, password }: { username: string; password: string }) => void
  onSignUpNavigation: () => void
}
export const SignInScreenTemplate = (props: Props) => {
  const { onSignInSubmit, onSignUpNavigation } = props
  const { control, handleSubmit, errors } = useForm<Asserts<typeof formSchema>>({
    defaultValues: formSchemaDefaultValues,
    resolver: yupResolver(formSchema),
  })

  return (
    <Screen style={ROOT} preset="scroll">
      <Logo width={138} height={167} style={LOGO} />
      <Text preset="title">BOOKM</Text>
      <Text preset="catchPhrase">Être ensemble a bon goût</Text>
      <Box jc="between" style={FORM}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              value={value}
              keyboardType="email-address"
              placeholder="e-mail"
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.username?.message}
            />
          )}
          name="username"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextField
              value={value}
              secureTextEntry
              textContentType={"oneTimeCode"}
              placeholder="mot de passe"
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
          name="password"
        />
        <Button text="Confirmer" onPress={handleSubmit(onSignInSubmit)} />
      </Box>
      <Box fd="row">
        <Text>Vous n’avez pas de compte ? </Text>
        <TouchableOpacity onPress={onSignUpNavigation}>
          <Text preset="link">Inscrivez-vous</Text>
        </TouchableOpacity>
      </Box>
    </Screen>
  )
}
