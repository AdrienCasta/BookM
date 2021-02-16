/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import {
  RecipeCreationScreen,
  HomeScreen,
  RecipeListScreen,
  MyBookMScreen,
  RecipePreviewScreen,
  RecipePreviewStepScreen,
} from "../screens"
import LogoWhiteIcon from "../../assets/logo-white.svg"
import { Box, Text } from "../components"
import { color, typography } from "../theme"
import { ProfilScreen } from "../screens/profile/profile-screen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  MainTabNavigator: undefined
}
export type TabParamList = {
  HomeScreen: undefined
  MyBookMNavigator: undefined
  ProfilScreen: undefined
}
export type MyBookMStackParamList = {
  MyBookMScreen: undefined
  RecipeCreationScreen: undefined
  RecipePreviewScreen: undefined
  RecipeListScreen: undefined
  RecipePreviewStepScreen: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()
const MyBookMStack = createStackNavigator<MyBookMStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

const TAB_BAR: ViewStyle = {
  borderRadius: 100,
  backgroundColor: color.secondary,
  paddingHorizontal: 37,
  height: 78,
}
const TAB_SCREEN_TOUCH: ViewStyle = {
  flex: 1,
}
const TAB_SCREEN_ITEM: ViewStyle = {
  backgroundColor: "black",
  width: 34,
  height: 34,
  borderRadius: 10,
  marginBottom: 6,
}

const TAB_SCREEN_ITEM_NAME: TextStyle = {
  fontFamily: typography.secondary,
  fontSize: 7,
}

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <Box fd="row" ai="center" style={TAB_BAR}>
      {state.routes.map((route, index) => {
        if (route.name === "HomeScreen") {
          return null
        }
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={TAB_SCREEN_TOUCH}
          >
            <Box jc="center" ai="center">
              <Box jc="center" ai="center" style={TAB_SCREEN_ITEM}>
                <LogoWhiteIcon width={22} height={31} />
              </Box>
              <Text text={label} style={TAB_SCREEN_ITEM_NAME} />
            </Box>
          </TouchableOpacity>
        )
      })}
    </Box>
  )
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        name="MyBookMNavigator"
        component={MyBookMNavigator}
        options={{ unmountOnBlur: true, tabBarLabel: "BookM", tabBarVisible: false }}
      />
      <Tab.Screen
        name="ProfilScreen"
        component={ProfilScreen}
        options={{ unmountOnBlur: true, tabBarLabel: "Profil", tabBarVisible: false }}
      />
    </Tab.Navigator>
  )
}
export function MyBookMNavigator() {
  return (
    <MyBookMStack.Navigator
      initialRouteName="MyBookMScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MyBookMStack.Screen name="MyBookMScreen" component={MyBookMScreen} />
      <MyBookMStack.Screen name="RecipeCreationScreen" component={RecipeCreationScreen} />
      <MyBookMStack.Screen name="RecipeListScreen" component={RecipeListScreen} />
      <MyBookMStack.Screen name="RecipePreviewScreen" component={RecipePreviewScreen} />
      <MyBookMStack.Screen name="RecipePreviewStepScreen" component={RecipePreviewStepScreen} />
    </MyBookMStack.Navigator>
  )
}
export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
