import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../App';
import { MyButton } from '../../components/shared/MyButton';
import { useTheme } from '../../context/ThemeContext';
import colors from '../../shared/themes/constants/colors';
import createTextStyles from '../../shared/themes/styles/textStyles';

// Define las props del componente
type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;

/**Por ahora, es la pagina de carga al entrar en la aplicacion o
 * la primera que sale al no estar logeado. Pienso que es esat ultima
 */
export function MainScreen({ navigation }: MainScreenProps) {
  const { theme } = useTheme();
  const textStyles = createTextStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={[textStyles.title, styles.mainTitle]}>
            Bienvenido a Routine Quest
          </Text>

          <Text style={[textStyles.subtitle, styles.subtitle]}>
            Tu aventura hacia mejores hábitos comienza aquí
          </Text>

          <Image
            source={require("../../../assets/portada_rq.png")}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.buttonContainer}>
            <MyButton
              title="Iniciar sesión"
              onPress={() => navigation.navigate("Login")}
              style={styles.loginButton}
            />
            <MyButton
              title="Crear cuenta"
              onPress={() => navigation.navigate("Register")}
              style={styles.registerButton}
            />
          </View>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  mainTitle: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 12,
    color: colors.primary,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    color: colors.textSecondary,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  loginButton: {
    backgroundColor: colors.primary,
  },
  registerButton: {
    backgroundColor: colors.success,
  },
});

export default MainScreen;
