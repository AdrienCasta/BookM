import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { ConfirmSignupScreen, SignupScreen, SignInScreen } from "../screens"
import { HeaderLeft, HEADER_OPTIONS } from "./navigation-utilities"
import { useNavigation } from "@react-navigation/native"

export type PrimaryParamList = {
  ConfirmSignupScreen: undefined
  SignUpScreen: undefined
  SignInScreen: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function AuthNavigator() {
  const navigation = useNavigation()
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <Stack.Navigator
      initialRouteName="ConfirmSignupScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignupScreen} />
      <Stack.Screen
        name="ConfirmSignupScreen"
        component={ConfirmSignupScreen}
        options={{
          headerShown: true,
          ...HEADER_OPTIONS,
          // eslint-disable-next-line react/display-name
          headerLeft: () => <HeaderLeft onPress={goBack} variant="chevron" />,
          headerTitle: () => null,
        }}
      />
    </Stack.Navigator>
  )
}

const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
