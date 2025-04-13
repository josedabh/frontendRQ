import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyles from "../../themes/styles/textStyles";

export default function ProfileScreen() {
    return (
        <SafeAreaView style = {{ padding: 16}}>
            <Text style = { textStyles.title }> Perfil </Text>
        </SafeAreaView>
    )
}