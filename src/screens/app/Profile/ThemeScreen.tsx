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
import { Theme } from '../../../shared/themes/themes';

type ThemeScreenNavigationProp = BottomTabNavigationProp<
    RootTabParamList,
    "Theme"
>;

export default function ThemeScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const textStyles = createTextStyles(theme);

    const { setThemeKey, themeKey } = useTheme();
    const navigation = useNavigation<ThemeScreenNavigationProp>();

    const themes = [
        { key: 'bermellon', title: 'Tema Bermellón' },
        { key: 'futurista', title: 'Tema Futurista' },
        { key: 'naturaleza', title: 'Tema Naturaleza' },
        { key: 'oscuro', title: 'Tema Oscuro' },
        { key: 'retro', title: 'Tema Retro' },
    ] as const;

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
                    {themes.map((item) => (
                        <MyButton
                            key={item.key}
                            title={item.title}
                            onPress={() => setThemeKey(item.key)}
                            style={[
                                styles.themeButton,
                                themeKey === item.key && styles.selectedButton
                            ]}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 24,
    },
    title: {
        textAlign: 'center',
        marginBottom: 32,
        color: theme.textSubtitle,
    },
    buttonContainer: {
        gap: 16,
    },
    themeButton: {
        backgroundColor: theme.buttonPrimary,
        borderRadius: 8,
        paddingVertical: 16,
    },
    selectedButton: {
        backgroundColor: theme.success,
        borderWidth: 2,
        borderColor: theme.accent,
    }
});
