import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Option from '../../components/features/profile/Option';
import colors from '../../shared/themes/constants/colors';
import globalStyles from '../../shared/themes/styles/globalStyles';
import textStyles from '../../shared/themes/styles/textStyles';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../Layout';

// Define el tipo de navegación para esta pantalla
type ProfileScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Perfil'>;
/**Ajustes del usuarios Nombre a cambiar */
export default function ProfileScreen() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    return (
        <SafeAreaView style = {{ padding: 16}}>
            <View style = { globalStyles.card }>
                <Image 
                    source = {require('../../../assets/Brad-Pitt.jpg')}
                    style = { styles.pruebaImage } 
                />
                <Text 
                    style = { textStyles.title }
                > Brad Pitt 
                </Text>
            </View>
            <View style = { globalStyles.card }>
                <Option title = 'Información de usuario' onPress = {() => navigation.navigate("Datauser")}/>
                <Option title = "Historial de retos cumplidos" />
                <Option title = "Historial de Recompensas" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pruebaImage : {
        width: 200,
        height: 200,
        borderWidth: 3.5,
        borderColor: colors.backgroundDark,
        borderRadius: 100,
        //Centra la imagen
        alignSelf: 'center',
        //La imagen se corta para que quepa la imagen
        resizeMode: "cover",
    }
})