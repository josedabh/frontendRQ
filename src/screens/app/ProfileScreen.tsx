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
import { MyModal } from '../../components/features/profile/MyModal';
import { Avatar } from '../../components/features/profile/Avatar';

// Define el tipo de navegación para esta pantalla
type ProfileScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Perfil'>;
/**Ajustes del usuarios Nombre a cambiar */
export default function ProfileScreen() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const [modalLogout, setModalLogout] = useState(false);

    return (
        <SafeAreaView style = {{ padding: 16}}>
            <MyModal 
                title='¿Estás seguro de cerrar sesión?'
                visible={modalLogout}
                onClose={() => setModalLogout(false)}
                onAction={() => {
                    setModalLogout(false);
                    console.log("Cerrar sesión");
                    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el token de autenticación o redirigir al usuario a la pantalla de inicio de sesión.
                    // navigation.navigate("Login")
                }}
                onCancel={() => setModalLogout(false)}
            />
            <Avatar />
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