import { StyleSheet } from "react-native";
import { Theme } from "../themes";

const createGlobalStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 16,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 8,
      overflow: "hidden",
      margin: 16,
      padding: 16,
      // Sombra para iOS y Android
      elevation: 3,
      boxShadow: theme.shadowColor,
      width: "90%",
      borderColor: theme.border,
      borderWidth: 1,
    },
    input: {
      width: "100%",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.backgroundCard,
      marginBottom: 12,
    },
    tabBar: {
      position: "absolute", // Posiciona el tab bar fijo en la parte inferior
      bottom: 0,
      left: 0,
      right: 0,
      elevation: 0,
      borderTopWidth: 0,
      borderTopColor: theme.divider,
      backgroundColor: theme.background,
      height: 64,
      paddingBottom: 8,
    },
  });

export default createGlobalStyles;
