import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '../../components/shared/Card/Card';
import MySearchbar from '../../components/shared/MySearchBar/MySearchBar';
import textStyles from '../../shared/themes/styles/textStyles';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../Layout';
import HeaderNavigation from '../../components/layout/HeaderNavigation';

const prueba = ['Correr 300 km/h', 'Cocinar dinosaurio a la plancha',
     'Cazar vampiros con una cuchara',
    'Ser campeon de yerba sin fumar yerba']

type ListChallengesScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'ListChallenge'>;

export default function ListChallengesScreen() {
    const navigation = useNavigation<ListChallengesScreenNavigationProp>();
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
                            title = { example }
                            onPress={() => navigation.navigate("Challenge")}
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
        paddingBottom: 10,
    },
});