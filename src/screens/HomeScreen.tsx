import React, { useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";
import ItemCard from "../components/ItemCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRoutes } from "../store/slices/itemsSlice";
import { logout } from "../store/slices/authSlice";
import type {
  MainTabParamList,
  RootStackParamList,
} from "../navigation/AppNavigator";
import type { RootState } from "../store";

const EmptyList = ({
  isLoading,
  error,
}: {
  isLoading: boolean;
  error: string | null;
}) => (
  <View style={styles.emptyState}>
    {isLoading ? (
      <ActivityIndicator size="small" />
    ) : error ? (
      <Text style={styles.errorText}>{error}</Text>
    ) : (
      <Text>No routes available.</Text>
    )}
  </View>
);

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Home">,
  StackNavigationProp<RootStackParamList>
>;

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const { routes, loading, favourites, error } = useAppSelector(
    (state: RootState) => state.items
  );
  const username = useAppSelector(
    (state: RootState) => state.auth.user?.username ?? "User"
  );

  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <LinearGradient
        colors={["#1976D2", "#1565C0"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Favourites")}
              accessibilityRole="button"
              style={styles.favButton}
            >
              <Feather
                name="star"
                size={24}
                color={favourites.length ? "#FFC107" : "#ffffff"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(logout())}
              accessibilityRole="button"
              style={styles.logoutButton}
            >
              <Feather name="log-out" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => navigation.navigate("Details", { itemId: item.id })}
          />
        )}
        contentContainerStyle={
          routes.length === 0 ? styles.listContentCenter : styles.listContent
        }
        ListEmptyComponent={<EmptyList isLoading={loading} error={error} />}
        refreshing={loading}
        onRefresh={() => dispatch(fetchRoutes())}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 14,
    color: "#E3F2FD",
    fontWeight: "500",
  },
  username: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 4,
  },
  favButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 10,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 12,
  },
  logoutButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 10,
  },
  listContent: {
    padding: 16,
    paddingTop: 20,
  },
  listContentCenter: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  emptyState: {
    alignItems: "center",
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
    paddingHorizontal: 24,
    fontSize: 15,
  },
});

export default HomeScreen;
