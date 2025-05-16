import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '../../../components/layout/profile/Avatar';
import { MyModal } from '../../../components/layout/profile/MyModal';
import Option from '../../../components/layout/profile/Option';
import { AuthContext } from '../../../context/AuthContext';
import globalStyles from '../../../shared/themes/styles/globalStyles';
import { RootTabParamList } from '../../Layout';

// Define el tipo de navegación para esta pantalla
type ProfileScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Perfil'>;

export default function ProfileScreen() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [modalLogout, setModalLogout] = useState(false);
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        setModalLogout(false);
        await logout();
    };

    return (
        // 1) SafeAreaView para respetar notch/áreas seguras
        <SafeAreaView style={styles.safeArea}>

            {/* 2) ScrollView ocupa TODO el área del SafeAreaView */}
            <ScrollView
                style={styles.scroll}               // hace que el scrollView rellene todo
                contentContainerStyle={styles.contentContainer}
            >

                {/* Modal de confirmación */}
                <MyModal
                    title='¿Estás seguro de cerrar sesión?'
                    visible={modalLogout}
                    onClose={() => setModalLogout(false)}
                    onAction={handleLogout}
                    onCancel={() => setModalLogout(false)}
                />

                {/* Avatar (ahora también scrollable con el resto) */}
                <Avatar />

                {/* Tarjeta con opciones */}
                <View style={globalStyles.card}>
                    <Option title='Información de usuario' onPress={() => navigation.navigate("Datauser")} />
                    <Option title="Historial de retos cumplidos" />
                    <Option title="Historial de Recompensas" />
                    <Option title="Cerrar Sesión" onPress={() => setModalLogout(true)} />
                    {/* Imagina muchas más opciones aquí... */}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,               // El SafeAreaView ocupa toda la pantalla
    },
    scroll: {
        flex: 1,               // El ScrollView rellena todo el SafeAreaView
    },
    contentContainer: {
        flexGrow: 1,           // Permite que el contenido interno empuje el scroll
        padding: 16,           // Tu padding general
    },
});