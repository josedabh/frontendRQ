import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.backgroundLight,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default buttonStyles;
