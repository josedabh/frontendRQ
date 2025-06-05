import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "../../../App";
import { MyButton } from "../../components/shared/MyButton";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../shared/themes/constants/colors";
import textStyles from "../../shared/themes/styles/textStyles";

// Definir el tipo de navegación
type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

/** Pantalla de registro de usuario */
export function RegisterScreen() {
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
      navigation.replace("Layout"); // Navega al home después del registro exitoso
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al crear la cuenta");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[textStyles.title, styles.title]}>Crear Cuenta</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            value={formData.lastname}
            onChangeText={(text) => setFormData({ ...formData, lastname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
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
    color: colors.primary,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.backgroundDark,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 24,
  },
  registerButton: {
    backgroundColor: colors.primary,
  },
  backButton: {
    backgroundColor: colors.danger,
  },
});

export default RegisterScreen;
