import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '../../themes/styles/globalStyles';
import textStyles from '../../themes/styles/textStyles';
import MySearchbar from '../../components/shared/MySearchBar';
import Card from '../../components/shared/Card';

export default function ChallengesScreen() {
    return (
        <SafeAreaView style = {{ padding: 16}}>
            <Text style = { textStyles.title }> Retos </Text>
            <MySearchbar title = "Buscar reto" />
            <View style = { [globalStyles.card, { margin: 20}] }>
                <Text
                    style={textStyles.subtitle}
                > Categorías
                </Text>
                <Card
                    imageSource={require('../../../assets/PruebaChallenges.jpg')}
                    title = 'Correr 300 km/h'
                />
            </View>
        </SafeAreaView>
    )
}