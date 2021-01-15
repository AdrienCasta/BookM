/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React, { useEffect, useState } from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { AuthNavigator } from "./auth-navigator"
import { MainNavigator } from "./main-navigator"
import { Auth, Hub } from "aws-amplify"
import { AppState } from "react-native"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  mainStack: undefined
  authStack: undefined
}

const Stack = createStackNavigator<RootParamList>()

const retreiveCurrentStack = async () => {
  try {
    await Auth.currentAuthenticatedUser()
    return "mainStack"
  } catch (e) {
    return "authStack"
  }
}

const RootStack = () => {
  const [stack, setStack] = useState<keyof RootParamList | null>(null)
  const handleAuthHubEvent = ({ payload: { event } }) => {
    if (event === "signIn") {
      setStack("mainStack")
    }
    if (event === "signOut") {
      setStack("authStack")
    }
  }
  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === "active") {
      setStack(await retreiveCurrentStack())
    }
  }

  /*
   * Update stack on signIn/signOut event from Amplify Hub
   * signOut -> authStack
   * signIn -> mainStack
   */
  useEffect(() => {
    Hub.listen("auth", handleAuthHubEvent)
    return () => Hub.remove("auth", handleAuthHubEvent)
  }, [])

  /*
   * Update stack when screen change to `active` (foreground)
   * user is authenticated -> mainStack
   * user is not authenticated -> authStack
   */
  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange)

    return () => {
      AppState.removeEventListener("change", handleAppStateChange)
    }
  }, [])

  useEffect(() => {
    console.tron.log({ stack })
    if (stack !== null) {
      return
    }
    ;(async () => {
      setStack(await retreiveCurrentStack())
    })()
  }, [stack])

  if (stack === null) {
    return null
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={stack}
        component={stack === "authStack" ? AuthNavigator : MainNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
