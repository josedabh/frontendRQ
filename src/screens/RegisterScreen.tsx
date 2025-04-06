import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export function RegisterScreen() {
    const navigation = useNavigation();
    return(
        <View>
            <Text style = {style.title}>Registrarse</Text>
            <TextInput style = {style.input} placeholder="Nombre"></TextInput>
            <TextInput style = {style.input} placeholder="Apellidos"></TextInput>
            <TextInput style = {style.input} placeholder="Nombre de usuario"></TextInput>
            <TextInput style = {style.input} placeholder="Email"></TextInput>
            <TextInput style = {style.input} placeholder="Contraseña"></TextInput>
            <TextInput style = {style.input} placeholder="Validar contraseña"></TextInput>
            <Button title="Crear cuenta" />
            <Button title="Volver atrás" onPress={() => navigation.goBack()}/>
        </View>
    );
}


const style = StyleSheet.create({
    title: {
        padding: 4,
        color: '#fff',
        borderBottomColor: 'red',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    input: {
        margin: 10,
        width: 30,
        height: 30,
    }
});
export default RegisterScreen;