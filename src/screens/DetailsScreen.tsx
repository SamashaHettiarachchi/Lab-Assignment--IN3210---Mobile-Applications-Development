import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleFavourite } from "../store/slices/itemsSlice";
import type { RootState } from "../store";
import type { TransportRoute } from "../types";

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

interface DetailsScreenProps {
  route: DetailsScreenRouteProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const dispatch = useAppDispatch();
  const { itemId } = route.params;
  const { routes, favourites } = useAppSelector(
    (state: RootState) => state.items
  );
  const item = routes.find(
    (routeItem: TransportRoute) => routeItem.id === itemId
  );

  if (!item) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Route not found.</Text>
      </View>
    );
  }

  const isFavourite = favourites.includes(item.id);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.imageGradient}
          />
          <TouchableOpacity
            style={styles.favButton}
            onPress={() => dispatch(toggleFavourite(item.id))}
          >
            <Feather
              name={isFavourite ? "star" : "star"}
              size={24}
              color={isFavourite ? "#FFC107" : "#ffffff"}
              fill={isFavourite ? "#FFC107" : "none"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.statusBadge, item.status === "Active" ? styles.activeStatus : styles.upcomingStatus]}>
            <Feather
              name={item.status === "Active" ? "check-circle" : "clock"}
              size={16}
              color="#fff"
            />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>
          
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Schedule Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Feather name="clock" size={20} color="#1976D2" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Frequency</Text>
                <Text style={styles.infoText}>{item.frequency || "Every 15 mins"}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Feather name="calendar" size={20} color="#1976D2" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Operating Hours</Text>
                <Text style={styles.infoText}>{item.operatingHours || "5:00 AM - 11:00 PM"}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Feather name="map-pin" size={20} color="#1976D2" />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Route Type</Text>
                <Text style={styles.infoText}>Multiple Stops</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  favButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    padding: 10,
  },
  content: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  activeStatus: {
    backgroundColor: "#4CAF50",
  },
  upcomingStatus: {
    backgroundColor: "#FF9800",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#616161",
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: "#757575",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 15,
    color: "#424242",
    fontWeight: "500",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#616161",
  },
});

export default DetailsScreen;
