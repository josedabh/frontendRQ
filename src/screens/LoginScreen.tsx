import { useNavigation } from "@react-navigation/native";
import { Button, Text, TextInput, View } from "react-native";

export function LoginScreen() {
    const navigation = useNavigation();
    return(
        <View>
            <Text>Iniciar sesión</Text>
            <TextInput defaultValue="Email/Usuario"></TextInput>
            <TextInput defaultValue="Contraseña"></TextInput>
            <Button title="Entrar" />
            <Button title="Volver" onPress={() => navigation.goBack()}/>
        </View>
    );
}

export default LoginScreen;