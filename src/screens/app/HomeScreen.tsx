import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderHome from '../../components/layout/header/HeaderHome';
import { MyButton } from '../../components/shared/MyButton';
import { useTheme } from '../../context/ThemeContext';
import { UserProfile } from '../../shared/models/UserData';
import { getMyUserInfo } from '../../shared/services/UserService';
import colors from '../../shared/themes/constants/colors';
import createTextStyles from '../../shared/themes/styles/textStyles';
import { RootTabParamList } from '../Layout';
import { Theme } from '../../shared/themes/themes';

/** Pagina main que sale al principio cuadno ya estas logeado */
export default function HomeScreen() {
    const { theme } = useTheme();
    const textStyles = createTextStyles(theme);
    const styles = createStyles(theme);

    const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
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
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={[textStyles.title, styles.mainTitle]}>Routine Quest</Text>
                    <HeaderHome person={fullName ?? "Usuario"} />
                </View>

                {/* Points Card */}
                <View style={styles.card}>
                    <Text style={textStyles.subtitle}>Tus Puntos</Text>
                    <Text style={styles.pointsText}>{user?.points || 0} pts</Text>
                    <MyButton 
                        title="Ver Tienda" 
                        onPress={() => navigation.navigate('ListStore')}
                        style={styles.storeButton}
                    />
                </View>

                {/* Active Challenges */}
                <View style={styles.section}>
                    <Text style={[textStyles.subtitle, styles.sectionTitle]}>
                        Retos Activos
                    </Text>
                    <View style={styles.card}>
                        <Text style={textStyles.normal}>No hay retos activos</Text>
                        <MyButton 
                            title="Explorar Retos" 
                            onPress={() => navigation.navigate('ListChallenge')}
                            style={styles.challengeButton}
                        />
                    </View>
                </View>

                {/* Popular Rewards */}
                <View style={styles.section}>
                    <Text style={[textStyles.subtitle, styles.sectionTitle]}>
                        Recompensas Populares
                    </Text>
                    <View style={styles.card}>
                        <Text style={textStyles.normal}>
                            ¡Completa retos para ganar puntos y canjear recompensas!
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        padding: 16,
        paddingBottom: 70,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 16,
    },
    headerSection: {
        marginBottom: 24,
    },
    mainTitle: {
        fontSize: 28,
        color: theme.textTitle,
        textAlign: 'center',
        marginBottom: 16,
    },
    card: {
        backgroundColor: theme.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: theme.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderColor: theme.border,
        borderWidth: 1,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 12,
        color: theme.textSubtitle,
    },
    pointsText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'center',
        marginVertical: 8,
    },
    storeButton: {
        backgroundColor: theme.success,
        marginTop: 8,
    },
    challengeButton: {
        backgroundColor: theme.buttonPrimary,
        marginTop: 8,
    }
});
