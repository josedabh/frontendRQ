import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../App';
import { MyButton } from '../../components/shared/MyButton';
import { AuthContext } from '../../context/AuthContext';
import colors from '../../shared/themes/constants/colors';
import globalStyles from '../../shared/themes/styles/globalStyles';
import textStyles from '../../shared/themes/styles/textStyles';
import createGlobalStyles from '../../shared/themes/styles/globalStyles';
import { useTheme } from '../../context/ThemeContext';
import createTextStyles from '../../shared/themes/styles/textStyles';

/**Para Ir a la pantralla de registro Cambiar props */
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { theme } = useTheme();
  const textStyles = createTextStyles(theme);
  const globalStyles = createGlobalStyles(theme);

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert("Login correcto", "Bienvenido a la app");
      navigation.replace('Layout');
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error desconocido");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={[textStyles.title, styles.title]}>Iniciar sesión</Text>
          
          <View style={styles.form}>
            <TextInput
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              style={[globalStyles.input, styles.input]}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[globalStyles.input, styles.input]}
            />

            <View style={styles.buttonContainer}>
              <MyButton 
                onPress={handleLogin} 
                title="Iniciar sesión"
                style={styles.loginButton}
              />
              <MyButton
                title="Crear cuenta"
                onPress={() => navigation.navigate("Register")}
                style={styles.registerButton}
              />
              <MyButton 
                title="Volver" 
                onPress={() => navigation.goBack()}
                style={styles.backButton} 
              />
            </View>
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
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    minHeight: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
    color: colors.primary,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.backgroundDark,
    borderRadius: 8,
    padding: 12,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 24,
  },
  loginButton: {
    backgroundColor: colors.primary,
  },
  registerButton: {
    backgroundColor: colors.success,
  },
  backButton: {
    backgroundColor: colors.danger,
  }
});

export default LoginScreen;
