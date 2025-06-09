import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '../../../components/layout/profile/Avatar';
import { ModalProfile } from '../../../components/layout/profile/ModalProfile';
import Option from '../../../components/layout/profile/Option';
import { AuthContext } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { UserProfile } from '../../../shared/models/UserData';
import { getMyUserInfo } from '../../../shared/services/UserService';
import createGlobalStyles from '../../../shared/themes/styles/globalStyles';
import { Theme } from '../../../shared/themes/themes';
import { RootTabParamList } from '../../Layout';

// Define el tipo de navegación para esta pantalla
type ProfileScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    "Perfil"
>;

export default function ProfileScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const globalStyles = createGlobalStyles(theme);

    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [modalLogout, setModalLogout] = useState(false);
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        setModalLogout(false);
        await logout();
    };

    const [user, setUser] = useState<UserProfile | null>();
    useEffect(() => {
        const fetchData = async () => {
            const myUser = await getMyUserInfo();
            setUser(myUser);
        };
        fetchData();
    }, []);

    //Nombre completo del usuario
    const fullName = user?.name + " " + user?.lastname;

    return (
        // 1) SafeAreaView para respetar notch/áreas seguras
        <SafeAreaView style={styles.safeArea}>
            {/* 2) ScrollView ocupa TODO el área del SafeAreaView */}
            <ScrollView
                style={styles.scroll} // hace que el scrollView rellene todo
                contentContainerStyle={styles.contentContainer}
            >
                {/* Modal de confirmación */}
                <ModalProfile
                    title="¿Estás seguro de cerrar sesión?"
                    visible={modalLogout}
                    onClose={() => setModalLogout(false)}
                    onAction={handleLogout}
                    onCancel={() => setModalLogout(false)}
                />

                {/* Avatar (ahora también scrollable con el resto) */}
                <Avatar
                    textAvatar={fullName != undefined ? fullName : "Brad Pitt"}
                />

                {/* Tarjeta con opciones */}
                <View style={globalStyles.card}>
                    <Option
                        title="Información de usuario"
                        onPress={() => navigation.navigate("Datauser")}
                    />
                    <Option title="Historial de retos cumplidos" />
                    <Option
                        title="Historial de Recompensas"
                        onPress={() => navigation.navigate("HistoryShopping")} />
                    <Option 
                        title="Cambiar tema"
                        onPress={() => navigation.navigate("Theme")} />
                    <Option 
                        title="Cerrar Sesión" 
                        onPress={() => setModalLogout(true)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.background,
    },
    scroll: {
        flex: 1,
        backgroundColor: theme.background,
    },
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 64,
    },
});
