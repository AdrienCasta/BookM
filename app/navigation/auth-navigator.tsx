import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { ConfirmSignupScreen, SignupScreen } from "../screens"

export type PrimaryParamList = {
  ConfirmSignupScreen: undefined
  SignupScreen: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SignupScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ConfirmSignupScreen" component={ConfirmSignupScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  )
}

const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
