import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import type { RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useAppSelector } from "../store/hooks";
import type { RootState } from "../store";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Details: { itemId: number };
};

export type MainTabParamList = {
  Home: undefined;
  Favourites: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({
      route,
    }: {
      route: RouteProp<MainTabParamList, keyof MainTabParamList>;
    }): BottomTabNavigationOptions => ({
      headerShown: false,
      tabBarIcon: ({ color, size }: { color: string; size: number }) => {
        const iconMap: Record<string, string> = {
          Home: "home",
          Favourites: "star",
          Profile: "user",
        };
        const iconName = iconMap[route.name] ?? "circle";
        return <Feather name={iconName as any} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Favourites" component={FavouritesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "Route Details" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
