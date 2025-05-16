import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { Alert, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackParamList } from "../../../App";
import { MyButton } from "../../components/shared/MyButton";
import { AuthContext } from "../../context/AuthContext";
import { prueba } from "../../shared/services/UserService";
import globalStyles from "../../shared/themes/styles/globalStyles";
import textStyles from "../../shared/themes/styles/textStyles";

/**Para Ir a la pantralla de registro Cambiar props */
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState<string>("");

  useEffect(() => {
    const fetchMensaje = async () => {
      try {
        const texto = await prueba();
        setMensaje(texto);
      } catch (error) {
        setMensaje("Error al cargar el mensaje");
      }
    };

    fetchMensaje();
  }, []);

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert("Login correcto", "Bienvenido a la app");
      navigation.replace("Layout");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error desconocido");
    }
  };

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <Text style={textStyles.title}>Iniciar sesión</Text>
      <Text>{mensaje}</Text>
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={globalStyles.input}
      />
      <MyButton onPress={handleLogin} title="Iniciar sesión" />
      <MyButton
        title="Crear cuenta"
        onPress={() => navigation.navigate("Register")}
      />
      <MyButton title="Volver" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

export default LoginScreen;
