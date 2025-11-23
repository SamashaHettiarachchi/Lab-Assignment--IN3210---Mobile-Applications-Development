export const lightTheme = {
  background: "#F5F5F5",
  cardBackground: "#FFFFFF",
  text: "#212121",
  textSecondary: "#757575",
  headerBackground: ["#1976D2", "#1565C0"],
  headerText: "#FFFFFF",
  border: "#E0E0E0",
  statusBar: "dark-content" as const,
  statusBarBg: "#1565C0",
};

export const darkTheme = {
  background: "#121212",
  cardBackground: "#1E1E1E",
  text: "#FFFFFF",
  textSecondary: "#B0B0B0",
  headerBackground: ["#0D47A1", "#01579B"],
  headerText: "#FFFFFF",
  border: "#2C2C2C",
  statusBar: "light-content" as const,
  statusBarBg: "#01579B",
};

export type Theme = typeof lightTheme;
