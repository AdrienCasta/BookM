/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/display-name */
/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Image, ImageStyle, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import {
  RecipeCreationScreen,
  HomeScreen,
  RecipeListScreen,
  MyBookMScreen,
  RecipePreviewScreen,
  RecipePreviewStepScreen,
  ProfileEditScreen,
  ProfileScreen,
} from "../screens"
import LogoWhiteIcon from "../../assets/logo-white.svg"
import { Box, Text } from "../components"
import { color, typography } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../models"
import { HeaderLeft, HEADER_OPTIONS, HEADER_TITLE } from "./navigation-utilities"

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
export type MainStackParamList = {
  MainTabNavigator: undefined
}
export type PrimaryParamList = {
  Home: undefined
  ProfileEditScreen: undefined
}
export type TabParamList = {
  HomeScreen: undefined
  MyBookMNavigator: undefined
  ProfileStackNavigator: undefined
}
export type MyBookMStackParamList = {
  MyBookMScreen: undefined
  RecipeCreationScreen: undefined
  RecipePreviewScreen: undefined
  RecipeListScreen: undefined
  RecipePreviewStepScreen: undefined
}
export type ProfileStackParamList = {
  ProfileScreen: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const MainStack = createStackNavigator<MainStackParamList>()
const Stack = createStackNavigator<PrimaryParamList>()
const MyBookMStack = createStackNavigator<MyBookMStackParamList>()
const ProfileStack = createStackNavigator<ProfileStackParamList>()
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
const TAB_PROFILE: ImageStyle = {
  width: 34,
  height: 34,
  borderRadius: 10,
}

function MyTabBar({ state, descriptors, navigation }) {
  const { user } = useStores()
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

        const TabBarIcon = new Map([
          [
            "ProfileStackNavigator",
            <Image key={user.picture} source={{ uri: user.picture }} style={TAB_PROFILE} />,
          ],
        ]).get(route.name) || <LogoWhiteIcon width={22} height={31} />

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
                {TabBarIcon}
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
  const navigation = useNavigation()
  const handleProfileScreenNavigation = () => {
    navigation.navigate("ProfileScreen")
  }
  const handleProfileScreenNavigationWithSubmit = () => {
    navigation.navigate("ProfileScreen", {
      save: true,
    })
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen
        name="ProfileEditScreen"
        component={ProfileEditScreen}
        options={{
          ...HEADER_OPTIONS,
          headerTitle: (props) => <Text text="Modifier profil" style={{ fontSize: 20 }} />,
          headerRight: () => {
            return (
              <TouchableOpacity onPress={handleProfileScreenNavigationWithSubmit}>
                <Text text="Terminer" />
              </TouchableOpacity>
            )
          },
          headerLeft: () => <HeaderLeft onPress={handleProfileScreenNavigation} />,
        }}
      />
    </Stack.Navigator>
  )
}
export function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{ unmountOnBlur: true, tabBarLabel: "Profil" }}
      />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        name="MyBookMNavigator"
        component={MyBookMNavigator}
        options={{ unmountOnBlur: true, tabBarLabel: "BookM", tabBarVisible: false }}
      />
    </Tab.Navigator>
  )
}
export function ProfileStackNavigator() {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate("ProfileEditScreen")
  }

  return (
    <ProfileStack.Navigator initialRouteName="ProfileScreen">
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: null,
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          headerStyle: {
            shadowColor: "transparent",
          },
          headerRight: () => {
            return (
              <TouchableOpacity onPress={handlePress}>
                <Text text="Modifier" />
              </TouchableOpacity>
            )
          },
        }}
      />
    </ProfileStack.Navigator>
  )
}
export function MyBookMNavigator() {
  const navigation = useNavigation()

  return (
    <MyBookMStack.Navigator initialRouteName="MyBookMScreen" screenOptions={{ headerShown: false }}>
      <MyBookMStack.Screen name="MyBookMScreen" component={MyBookMScreen} />
      <MyBookMStack.Screen
        name="RecipeCreationScreen"
        component={RecipeCreationScreen}
        options={{
          ...HEADER_OPTIONS,
          // eslint-disable-next-line react/display-name
          headerTitle: (props) => <Text text="Nouvelle fiche" style={HEADER_TITLE} />,
          headerLeft: () => <HeaderLeft onPress={navigation.goBack} />,
        }}
      />
      <MyBookMStack.Screen
        name="RecipeListScreen"
        component={RecipeListScreen}
        options={{ headerShown: false }}
      />
      <MyBookMStack.Screen
        name="RecipePreviewScreen"
        component={RecipePreviewScreen}
        options={{ headerShown: false }}
      />
      <MyBookMStack.Screen
        name="RecipePreviewStepScreen"
        component={RecipePreviewStepScreen}
        options={{ headerShown: false }}
      />
    </MyBookMStack.Navigator>
  )
}
export function MainNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabNavigator" component={MainTabNavigator} />
    </MainStack.Navigator>
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
