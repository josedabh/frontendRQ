import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderHome from '../../components/features/header/HeaderHome';
import textStyles from '../../themes/styles/textStyles';

/** Pagina main que sale al principio cuadno ya estas logeado */
export default function HomeScreen() {
    return (
        <SafeAreaView style = {{ padding: 16}}>
            <Text style = { textStyles.title }> Routine Quest </Text>
            {/* <ScrollView> */}
                <HeaderHome person = "Brad Pitt" />
                <Text style = { textStyles.subtitle }> Top Retos </Text>
                <Text style = { textStyles.subtitle }> Retos Actuales </Text>
                <Text style = { textStyles.subtitle }> * Ver Recompensas Populares </Text>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}