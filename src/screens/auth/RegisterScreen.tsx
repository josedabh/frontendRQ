import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../App';
import { MyButton } from '../../components/shared/MyButton';
import { AuthContext } from '../../context/AuthContext';
import colors from '../../shared/themes/constants/colors';
import createAuthStyles from '../../shared/themes/styles/authStyles';
import createTextStyles from '../../shared/themes/styles/textStyles';
import { useTheme } from '../../context/ThemeContext';

// Definir el tipo de navegación
type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

/** Pantalla de registro de usuario */
export function RegisterScreen() {
  const { theme } = useTheme();
  const textStyles = createTextStyles(theme);
  const authStyles = createAuthStyles(theme);

  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { register } = useContext(AuthContext);

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Función para manejar el registro
  const handleRegister = async () => {
    // Validaciones básicas
    if (!formData.email || !formData.password || !formData.username) {
      Alert.alert("Error", "Por favor, rellena todos los campos obligatorios");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      // Crear objeto con los datos necesarios para el registro
      const userData = {
        name: formData.name,
        lastname: formData.lastname,
        username: formData.username,
        numPhone: formData.phone,
        email: formData.email,
        password: formData.password,
      };

      await register(userData);
      Alert.alert("Éxito", "Cuenta creada correctamente");
      // Change from reset to replace
      navigation.replace('Layout');
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al crear la cuenta");
    }
  };
  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.scrollContainer}>
        <Text style={[textStyles.title, authStyles.title]}>Crear Cuenta</Text>

        <View style={authStyles.form}>
          <TextInput
            style={authStyles.input}
            placeholder="Nombre"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={authStyles.input}
            placeholder="Apellidos"
            value={formData.lastname}
            onChangeText={(text) => setFormData({ ...formData, lastname: text })}
          />
          <TextInput
            style={authStyles.input}
            placeholder="Nombre de usuario"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
          />
          <TextInput
            style={authStyles.input}
            placeholder="Teléfono"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={authStyles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={authStyles.input}
            placeholder="Contraseña"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />
          <TextInput
            style={authStyles.input}
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
          />

          <View style={authStyles.buttonContainer}>
            <MyButton 
              title="Crear cuenta" 
              onPress={handleRegister}
              style={styles.registerButton}
            />
            <MyButton 
              title="Volver" 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  registerButton: {
    backgroundColor: colors.primary,
  },
  backButton: {
    backgroundColor: colors.danger,
  },
});

export default RegisterScreen;
