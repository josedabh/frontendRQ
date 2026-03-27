import { StyleSheet } from "react-native";

import { Theme } from "../themes";

/**
 * Estilos compartidos para pantallas de autenticación.
 * Se centralizan aquí para evitar duplicados entre Main/Login/Register.
 */
const createAuthStyles = (theme: Theme) =>
  StyleSheet.create({
    // Estructura base de pantalla
    container: {
      flex: 1,
      backgroundColor: theme.backgroundAlt,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 24,
    },

    // Contenido principal y formularios
    contentCentered: {
      flex: 1,
      justifyContent: "center",
      minHeight: "100%",
    },
    form: {
      width: "100%",
      gap: 16,
    },
    input: {
      backgroundColor: theme.backgroundCard,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: theme.text,
    },

    // Textos y acciones
    title: {
      textAlign: "center",
      marginBottom: 32,
      color: theme.primary,
    },
    subtitle: {
      textAlign: "center",
      marginBottom: 32,
      color: theme.textSubtitle,
    },
    buttonContainer: {
      width: "100%",
      gap: 12,
      marginTop: 24,
    },
  });

export default createAuthStyles;
