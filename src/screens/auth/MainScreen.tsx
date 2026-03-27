import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../App';
import { MyButton } from '../../components/shared/MyButton';
import { useTheme } from '../../context/ThemeContext';
import colors from '../../shared/themes/constants/colors';
import createAuthStyles from '../../shared/themes/styles/authStyles';
import createTextStyles from '../../shared/themes/styles/textStyles';

// Define las props del componente
type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;

/**Por ahora, es la pagina de carga al entrar en la aplicacion o
 * la primera que sale al no estar logeado. Pienso que es esat ultima
 */
export function MainScreen({ navigation }: MainScreenProps) {
  const { theme } = useTheme();
  const textStyles = createTextStyles(theme);
  const authStyles = createAuthStyles(theme);
  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView
        contentContainerStyle={authStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[authStyles.contentCentered, styles.content]}>
          <Text style={[textStyles.title, styles.mainTitle]}>
            Bienvenido a Routine Quest
          </Text>

          <Text style={[textStyles.subtitle, authStyles.subtitle]}>
            Tu aventura hacia mejores hábitos comienza aquí
          </Text>

          <Image
            source={require("../../../assets/portada_rq.png")}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={[authStyles.buttonContainer, styles.mainButtonContainer]}>
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
  content: {
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 12,
    color: colors.primary,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 40,
  },
  mainButtonContainer: {
    width: "100%",
    gap: 16,
    marginTop: 0,
  },
  loginButton: {
    backgroundColor: colors.primary,
  },
  registerButton: {
    backgroundColor: colors.success,
  },
});

export default MainScreen;
