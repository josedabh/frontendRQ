import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '../../components/features/profile/Avatar';
import { MyModal } from '../../components/features/profile/MyModal';
import Option from '../../components/features/profile/Option';
import { AuthContext, removeToken } from '../../context/AuthContext';
import globalStyles from '../../shared/themes/styles/globalStyles';
import { RootTabParamList } from '../Layout';

// Define el tipo de navegación para esta pantalla
type ProfileScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Perfil'>;

/**Ajustes del usuarios Nombre a cambiar */
export default function ProfileScreen() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const [modalLogout, setModalLogout] = useState(false);

    const { logout } = useContext(AuthContext); // Accede a la función del contexto

    const handleLogout = async () => {
        setModalLogout(false); // Oculta el modal
        await logout();        // Elimina el token y actualiza el contexto
    };


    return (
        <SafeAreaView style = {{ padding: 16}}>
            <MyModal 
                title='¿Estás seguro de cerrar sesión?'
                visible={modalLogout}
                onClose={() => setModalLogout(false)}
                onAction={handleLogout}
                onCancel={() => setModalLogout(false)}
            />
            <Avatar />
            <View style={globalStyles.card}>
                <Option title='Información de usuario' onPress={() => navigation.navigate("Datauser")} />
                <Option title="Historial de retos cumplidos" />
                <Option title="Historial de Recompensas" />
                <Option title="Cerrar Sesión" onPress={() => setModalLogout(true)} />
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