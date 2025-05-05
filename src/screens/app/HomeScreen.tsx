import { StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderHome from '../../components/layout/header/HeaderHome';
import textStyles from '../../shared/themes/styles/textStyles';

/** Pagina main que sale al principio cuadno ya estas logeado */
export default function HomeScreen() {
    return (
        <SafeAreaView style={{ padding: 16 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Text style={textStyles.title}> Routine Quest </Text>
            <HeaderHome person="Brad Pitt" />
            <Text style={textStyles.subtitle}> Top Retos </Text>
            <Text style={textStyles.subtitle}> Retos Actuales </Text>
            <Text style={ textStyles.subtitle }> * Ver Recompensas Populares </Text>
        </SafeAreaView>
    )
}