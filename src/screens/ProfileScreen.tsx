import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { toggleTheme } from "../store/slices/themeSlice";
import type { RootState } from "../store";
import { lightTheme, darkTheme } from "../utils/theme";

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const favourites = useAppSelector((state: RootState) => state.items.favourites);
  const isDarkMode = useAppSelector((state: RootState) => state.theme.isDarkMode);
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleEditProfile = () => {
    Alert.alert(
      "Edit Profile",
      "Profile editing feature coming soon!",
      [{ text: "OK" }]
    );
  };

  const handleSavedAddresses = () => {
    Alert.alert(
      "Saved Addresses",
      "You have no saved addresses yet.",
      [{ text: "OK" }]
    );
  };

  const handlePaymentMethods = () => {
    Alert.alert(
      "Payment Methods",
      "No payment methods added.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Add Card", onPress: () => {} }
      ]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Privacy & Security",
      "Manage your privacy settings and data.",
      [{ text: "OK" }]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      "Help & Support",
      "Need help? Contact us at:\nsupport@gomate.com\n\nPhone: 1-800-GOMATE",
      [{ text: "OK" }]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About GoMate Transport",
      "Version 1.0.0\n\nYour trusted transport companion.\n\n© 2025 GoMate Transport Inc.",
      [{ text: "OK" }]
    );
  };

  const menuItems = [
    { icon: "user", label: "Edit Profile", action: handleEditProfile },
    { icon: "map-pin", label: "Saved Addresses", action: handleSavedAddresses },
    { icon: "credit-card", label: "Payment Methods", action: handlePaymentMethods },
    { icon: "shield", label: "Privacy & Security", action: handlePrivacy },
    { icon: "help-circle", label: "Help & Support", action: handleHelp },
    { icon: "info", label: "About", action: handleAbout },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.statusBar} backgroundColor={theme.statusBarBg} />
      <LinearGradient
        colors={theme.headerBackground as any}
        style={styles.headerGradient}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={["#FFC107", "#FF9800"]}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </Text>
            </LinearGradient>
          </View>
          <Text style={styles.username}>{user?.username || "User"}</Text>
          <Text style={styles.email}>user@gomate.com</Text>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.statsContainer, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.statBox}>
            <Feather name="star" size={24} color="#1976D2" />
            <Text style={[styles.statNumber, { color: theme.text }]}>{favourites.length}</Text>
            <Text style={styles.statLabel}>Favourites</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statBox}>
            <Feather name="map" size={24} color="#1976D2" />
            <Text style={[styles.statNumber, { color: theme.text }]}>12</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statBox}>
            <Feather name="award" size={24} color="#1976D2" />
            <Text style={[styles.statNumber, { color: theme.text }]}>5</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>
          
          {/* Dark Mode Toggle */}
          <View style={[styles.menuItem, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.menuIconContainer}>
              <Feather name={isDarkMode ? "moon" : "sun"} size={22} color="#1976D2" />
            </View>
            <Text style={[styles.menuLabel, { color: theme.text }]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={() => { dispatch(toggleTheme()); }}
              trackColor={{ false: "#E0E0E0", true: "#81C784" }}
              thumbColor={isDarkMode ? "#4CAF50" : "#BDBDBD"}
            />
          </View>
          
          {/* Notifications Toggle */}
          <View style={[styles.menuItem, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.menuIconContainer}>
              <Feather name="bell" size={22} color="#1976D2" />
            </View>
            <Text style={[styles.menuLabel, { color: theme.text }]}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#E0E0E0", true: "#81C784" }}
              thumbColor={notificationsEnabled ? "#4CAF50" : "#BDBDBD"}
            />
          </View>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: theme.cardBackground }]}
              onPress={item.action}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconContainer}>
                <Feather name={item.icon as any} size={22} color="#1976D2" />
              </View>
              <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
              <Feather name="chevron-right" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => dispatch(logout())}
          activeOpacity={0.8}
        >
          <Feather name="log-out" size={20} color="#d32f2f" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
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
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  profileHeader: {
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#ffffff",
  },
  username: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#E3F2FD",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212121",
  },
  statLabel: {
    fontSize: 13,
    color: "#757575",
  },
  section: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: "#424242",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d32f2f",
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#d32f2f",
  },
  version: {
    textAlign: "center",
    color: "#9E9E9E",
    fontSize: 13,
    marginTop: 24,
    marginBottom: 32,
  },
});

export default ProfileScreen;
