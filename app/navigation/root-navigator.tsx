/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React, { useEffect, useState } from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import BottomSheet from "reanimated-bottom-sheet"
import { AuthNavigator } from "./auth-navigator"
import { MainNavigator } from "./main-navigator"
import { Auth, Hub } from "aws-amplify"
import { AppState, View, ViewStyle } from "react-native"
import { useStores } from "../models"
import { AppToast } from "../components/app-toast/app-toast"
import shadowViewStyle from "../utils/shadow"
import { observer } from "mobx-react-lite"
import { color } from "../theme"
import { IRequestModel } from "../models/request/request"

const BOTTOMSHEET_HEADER: ViewStyle = {
  ...shadowViewStyle(0, -3),
  backgroundColor: color.background,
  height: 60,
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
}
const BOTTOMSHEET_CONTENT: ViewStyle = {
  height: "100%",
  backgroundColor: color.background,
}

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

const RootStack = observer(function () {
  /**
   * Toast handler
   */
  const sheetRef = React.useRef(null)
  const { request } = useStores()
  const [toastVisibility, setToastVisibility] = useState(false)
  const [toastStatus, setToastStatus] = useState<"error" | "success">("error")

  useEffect(() => {
    if (sheetRef.current) {
      const snapPoint = toastVisibility ? 0 : 1
      sheetRef.current.snapTo(snapPoint)
    }
  }, [toastVisibility])

  useEffect(() => {
    if (["FAILURE", "SUCCESS", "CONFIRMED"].includes(request.status) === false) {
      return
    }
    setToastVisibility(request.status !== "CONFIRMED")
  }, [request.status])

  useEffect(() => {
    if (request.status === "IDLE") {
      return
    }
    const requestStatusToastStatus = new Map<IRequestModel["status"], typeof toastStatus>([
      ["FAILURE", "error"],
      ["SUCCESS", "success"],
    ])
    setToastStatus(requestStatusToastStatus.get(request.status))
  }, [request.status])

  const handleToastContinue = () => {
    request.setConfirmedStatus()
  }

  /**
   * Stack handler
   */
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
    <>
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
      <BottomSheet
        ref={sheetRef}
        snapPoints={[460, 0]}
        initialSnap={1}
        renderHeader={() => <View style={BOTTOMSHEET_HEADER}></View>}
        renderContent={() => (
          <View style={BOTTOMSHEET_CONTENT}>
            <AppToast
              onContinue={handleToastContinue}
              text={request.message}
              variant={toastStatus}
            />
          </View>
        )}
      />
    </>
  )
})

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <>
      <NavigationContainer {...props} ref={ref}>
        <RootStack />
      </NavigationContainer>
    </>
  )
})

RootNavigator.displayName = "RootNavigator"
