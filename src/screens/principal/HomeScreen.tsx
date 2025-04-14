import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderHome from '../../components/homescreen/HeaderHome';
import textStyles from '../../themes/styles/textStyles';

/** Pagina main que sale al principio cuadno ya estas logeado */
export default function HomeScreen() {
    return (
        <SafeAreaView style = {{ padding: 16}}>
            <Text style = { textStyles.title }> Casa </Text>
            {/* <ScrollView> */}
                <HeaderHome person = "Brad Pitt" />
                <Text> Top Retos </Text>
                <Text> Retos Actuales </Text>
                <Text> * Ver Recompensas Populares </Text>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}