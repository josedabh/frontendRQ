import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '../../components/shared/Card';
import textStyles from '../../shared/themes/styles/textStyles';

const prueba = [
    { id: 1, name: "Producto 1", price: "10" },
    { id: 2, name: "Producto 2", price: "20" },
    { id: 3, name: "Producto 3", price: "30" },
    { id: 4, name: "Producto 4", price: "40" },
    { id: 5, name: "Producto 5", price: "50" },
]
export default function StoreScreen() {
    return (
        <SafeAreaView style={{ padding: 16 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={textStyles.title}>Tienda</Text>
                <ScrollView contentContainerStyle = {styles.horizontalScroll}>
                    {prueba.map((item) => (
                        <Card
                            key = { item.id }
                            title = { item.name }
                            desc = { item.price.concat("€") }
                        />
                    ))}
                </ScrollView>
                <Text style = { textStyles.normal }>
                    Total: {prueba.reduce((acc, item) => acc + Number.parseInt(item.price), 0)} 
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    horizontalScroll: {
        paddingLeft: 24,
        paddingBottom: 10,
    },
});