import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyles from "../../shared/themes/styles/textStyles";
import { View } from "react-native";

const prueba = [
    { id: 1, name: "Producto 1", price: 10 },
    { id: 2, name: "Producto 2", price: 20 },
    { id: 3, name: "Producto 3", price: 30 },
    { id: 4, name: "Producto 4", price: 40 },
    { id: 5, name: "Producto 5", price: 50 },
]
export default function StoreScreen() {
    return (
        <SafeAreaView style = {{ padding: 16}}>
            <Text style = { textStyles.title }> Tienda </Text>
            {prueba.map((item) => (
                <View key={item.id} style={{ marginBottom: 8 }}>
                    <Text style = { textStyles.subtitle }> { item.name } </Text>
                    <Text style = { textStyles.normal }> ${ item.price } </Text>
                </View>
            ))}
            <Text style = { textStyles.normal }> Total: {prueba.reduce((acc, item) => acc + item.price, 0)} </Text>
        </SafeAreaView>
    )
}