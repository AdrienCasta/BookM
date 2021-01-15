import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { ConfirmSignupScreen, SignupScreen, SignInScreen } from "../screens"

export type PrimaryParamList = {
  ConfirmSignupScreen: undefined
  SignUpScreen: undefined
  SignInScreen: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignupScreen} />
      <Stack.Screen name="ConfirmSignupScreen" component={ConfirmSignupScreen} />
    </Stack.Navigator>
  )
}

const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
