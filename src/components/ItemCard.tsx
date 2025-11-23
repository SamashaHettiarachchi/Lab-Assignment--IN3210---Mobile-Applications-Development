import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import type { TransportRoute } from "../types";

interface ItemCardProps {
  item: TransportRoute;
  onPress: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={styles.imageOverlay}
      />
    </View>
    <View style={styles.body}>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text numberOfLines={2} style={styles.description}>
        {item.description}
      </Text>
      <View style={styles.statusRow}>
        <View
          style={[
            styles.statusBadge,
            item.status === "Active"
              ? styles.activeStatus
              : styles.upcomingStatus,
          ]}
        >
          <Feather
            name={item.status === "Active" ? "check-circle" : "clock"}
            size={14}
            color="#fff"
          />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    width: 120,
    height: 120,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  body: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#212121",
    marginBottom: 6,
  },
  description: {
    flex: 1,
    fontSize: 13,
    color: "#757575",
    lineHeight: 18,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  activeStatus: {
    backgroundColor: "#4CAF50",
  },
  upcomingStatus: {
    backgroundColor: "#FF9800",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default ItemCard;
