import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Option from '../../components/features/profile/Option';
import colors from '../../shared/themes/constants/colors';
import globalStyles from '../../shared/themes/styles/globalStyles';
import textStyles from '../../shared/themes/styles/textStyles';
import { RootTabParamList } from '../Layout';
import { MyButton } from '../../components/shared/MyButton/MyButton';

// Define el tipo de navegación para esta pantalla
type ProfileScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Perfil'>;
/**Ajustes del usuarios Nombre a cambiar */
export default function ProfileScreen() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const [modalLogout, setModalLogout] = useState(false);

    return (
        <SafeAreaView style = {{ padding: 16}}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalLogout}
                onRequestClose={() => {
                    setModalLogout(false);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>¡Hola, este es un modal!</Text>
                    <MyButton
                        title="Cancelar"
                        onPress={() => setModalLogout(false)}
                    />
                </View>
            </Modal>
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
                <Option title = "Cerrar Sesión" onPress = {() => setModalLogout(true)}/>
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
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})