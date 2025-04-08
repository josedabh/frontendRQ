import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const textStyles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 12,
    },
    paragraph: {
        fontSize: 16,
        color: colors.textSecondary,
    },
})

export default textStyles;