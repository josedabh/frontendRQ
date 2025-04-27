import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyles from "../../shared/themes/styles/textStyles";

export default function StoreScreen() {
    return (
        <SafeAreaView style = {{ padding: 16}}>
            <Text style = { textStyles.title }> Tienda </Text>
        </SafeAreaView>
    )
}