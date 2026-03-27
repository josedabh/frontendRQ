import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../App';
import { MyButton } from '../../components/shared/MyButton';
import { AuthContext } from '../../context/AuthContext';
import colors from '../../shared/themes/constants/colors';
import createAuthStyles from '../../shared/themes/styles/authStyles';
import { useTheme } from '../../context/ThemeContext';
import createTextStyles from '../../shared/themes/styles/textStyles';

/**Para Ir a la pantralla de registro Cambiar props */
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { theme } = useTheme();
  const textStyles = createTextStyles(theme);
  const authStyles = createAuthStyles(theme);

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
    <SafeAreaView style={authStyles.container}>
      <ScrollView 
        contentContainerStyle={authStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={authStyles.contentCentered}>
          <Text style={[textStyles.title, authStyles.title]}>Iniciar sesión</Text>
          
          <View style={authStyles.form}>
            <TextInput
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              style={authStyles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={authStyles.input}
            />

            <View style={authStyles.buttonContainer}>
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
