import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";
import store from "./src/store";
import { useAppDispatch } from "./src/store/hooks";
import { restoreUser } from "./src/store/slices/authSlice";
import { restoreFavourites } from "./src/store/slices/itemsSlice";
import { setTheme } from "./src/store/slices/themeSlice";

const AppBootstrap = () => {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const scheme = useColorScheme();

  useEffect(() => {
    const hydrateState = async () => {
      try {
        const [storedUser, storedFavourites, storedDarkMode] =
          await Promise.all([
            AsyncStorage.getItem("user"),
            AsyncStorage.getItem("favourites"),
            AsyncStorage.getItem("darkMode"),
          ]);

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser.username === "string") {
            dispatch(restoreUser(parsedUser));
          } else {
            dispatch(restoreUser(null));
          }
        } else {
          dispatch(restoreUser(null));
        }

        if (storedFavourites) {
          const parsed = JSON.parse(storedFavourites);
          if (Array.isArray(parsed)) {
            dispatch(restoreFavourites(parsed));
          } else {
            dispatch(restoreFavourites([]));
          }
        } else {
          dispatch(restoreFavourites([]));
        }

        if (storedDarkMode) {
          const isDark = JSON.parse(storedDarkMode);
          dispatch(setTheme(isDark));
        }
      } catch (error) {
        console.warn("Failed to restore persisted state", error);
        dispatch(restoreUser(null));
        dispatch(restoreFavourites([]));
      } finally {
        setReady(true);
      }
    };

    void hydrateState();
  }, [dispatch]);

  if (!ready) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  const navigationTheme = scheme === "dark" ? DarkTheme : DefaultTheme;
  const statusBarStyle = scheme === "dark" ? "light" : "dark";

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={statusBarStyle} />
      <AppNavigator />
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <AppBootstrap />
    </SafeAreaProvider>
  </Provider>
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
