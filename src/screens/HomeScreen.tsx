import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import textStyles from '../themes/styles/textStyles';

export function HomeScreen() {
    return (
        <SafeAreaView>
            <Text style = { textStyles.title }> Funciona </Text>
        </SafeAreaView>
    )
}

export default HomeScreen;