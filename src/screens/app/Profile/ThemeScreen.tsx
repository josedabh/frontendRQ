import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import { MyButton } from '../../../components/shared/MyButton';
import { useTheme } from '../../../context/ThemeContext';
import colors from '../../../shared/themes/constants/colors';
import textStyles from '../../../shared/themes/styles/textStyles';
import { RootTabParamList } from '../../Layout';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import createTextStyles from '../../../shared/themes/styles/textStyles';

type ThemeScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    "Theme"
>;

export default function ThemeScreen() {
    // Aplicamos estilos de texto personalizados
    const { theme } = useTheme();
    const textStyles = createTextStyles(theme);

    const { setThemeKey, themeKey } = useTheme();
    const navigation = useNavigation<ThemeScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader
                title="Cambiar Tema"
                onLeftPress={() => navigation.goBack()}
                leftLabel="← Volver"
            />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={[textStyles.subtitle, styles.title]}>
                    Selecciona un tema para personalizar tu experiencia
                </Text>

                <View style={styles.buttonContainer}>
                    <MyButton
                        title="Tema Bermellón"
                        onPress={() => setThemeKey('bermellon')}
                        style={[
                            styles.themeButton,
                            themeKey === 'bermellon' && styles.selectedButton
                        ]}
                    />
                    <MyButton
                        title="Tema Futurista"
                        onPress={() => setThemeKey('futurista')}
                        style={[
                            styles.themeButton,
                            themeKey === 'futurista' && styles.selectedButton
                        ]}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundLight,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 24,
    },
    title: {
        textAlign: 'center',
        marginBottom: 32,
        color: colors.textPrimary,
    },
    buttonContainer: {
        gap: 16,
    },
    themeButton: {
        backgroundColor: colors.primary,
        borderRadius: 8,
    },
    selectedButton: {
        backgroundColor: colors.success,
        borderWidth: 2,
        borderColor: colors.primary,
    }
});
