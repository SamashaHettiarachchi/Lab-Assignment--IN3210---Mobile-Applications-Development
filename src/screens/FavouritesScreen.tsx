import React from "react";
import { View, FlatList, Text, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { StackNavigationProp } from "@react-navigation/stack";
import ItemCard from "../components/ItemCard";
import { useAppSelector } from "../store/hooks";
import type {
  MainTabParamList,
  RootStackParamList,
} from "../navigation/AppNavigator";
import type { RootState } from "../store";

type FavNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Favourites">,
  StackNavigationProp<RootStackParamList>
>;

const FavouritesScreen: React.FC = () => {
  const navigation = useNavigation<FavNavigationProp>();
  const { routes, favourites } = useAppSelector(
    (state: RootState) => state.items
  );
  const favouriteRoutes = routes.filter((route) =>
    favourites.includes(route.id)
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <LinearGradient
        colors={["#1976D2", "#1565C0"]}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>My Favourites</Text>
        <Text style={styles.headerSubtitle}>
          {favouriteRoutes.length} {favouriteRoutes.length === 1 ? "route" : "routes"} saved
        </Text>
      </LinearGradient>
      {favouriteRoutes.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Feather name="star" size={64} color="#BDBDBD" />
          </View>
          <Text style={styles.emptyTitle}>No Favourites Yet</Text>
          <Text style={styles.emptyText}>
            Mark routes as favourite from the Home tab to see them here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favouriteRoutes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onPress={() =>
                navigation.navigate("Details", { itemId: item.id })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E3F2FD",
    marginTop: 4,
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
    paddingTop: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyIconContainer: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#424242",
    marginBottom: 12,
  },
  emptyText: {
    color: "#757575",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 24,
  },
});

export default FavouritesScreen;
