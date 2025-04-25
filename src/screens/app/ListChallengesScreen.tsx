import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '../../components/shared/Card/Card';
import MySearchbar from '../../components/shared/MySearchBar/MySearchBar';
import globalStyles from '../../themes/styles/globalStyles';
import textStyles from '../../themes/styles/textStyles';

const prueba = ['Correr 300 km/h', 'Hacer dinosaurio a la plancha',
    'Hacer saltos mortales sin ser mortal', 'Cazar vampiros con una cuchara',
    'Ser campeon de yerba sin fumar yerba']

export default function ListChallengesScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}> {/* Permite que ocupe toda la pantalla */}
            <View style={{ flex: 1, padding: 16 }}> {/* Contenedor flexible */}
                <Text style={textStyles.title}> Retos </Text>
                <MySearchbar title="Buscar reto" />
                <Text style={textStyles.subtitle}>Categorías</Text>
                {/* Scroll horizontal para categorías */}
                <ScrollView
                    // horizontal
                    // showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                >
                    {prueba.map((example, index) => (
                        <Card
                            key = { index }
                            imageSource = {require('../../../assets/PruebaChallenges.jpg')}
                            title = { example }
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    horizontalScroll: {
        paddingLeft: 24,
        paddingBottom: 10, // Espaciado inferior
    },
});