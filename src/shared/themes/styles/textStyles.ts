import { StyleSheet } from "react-native";
import colors from "../constants/colors";

/** Estilos para los textos */
const textStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 12,
    //Centra el texto
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textSecondary,
    margin: 6,
  },
  normal: {
    fontSize: 16,
    margin: 3,
    color: colors.textSecondary,
  },
});

export default textStyles;
