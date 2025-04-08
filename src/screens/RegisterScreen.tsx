import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput, View } from 'react-native';

import MyButton from '../components/MyButton';
import globalStyles from '../themes/styles/globalStyles';
import textStyles from '../themes/styles/textStyles';

export function RegisterScreen() {
    const navigation = useNavigation();
    return(
        <View>
            <Text style = {textStyles.title}>Registrarse</Text>
            {/**Formulario */}
            <TextInput style = {globalStyles.input} placeholder="Nombre"></TextInput>
            <TextInput style = {globalStyles.input} placeholder="Apellidos"></TextInput>
            <TextInput style = {globalStyles.input} placeholder="Nombre de usuario"></TextInput>
            <TextInput style = {globalStyles.input} placeholder="Email"></TextInput>
            <TextInput style = {globalStyles.input} placeholder="Contraseña"></TextInput>
            <TextInput style = {globalStyles.input} placeholder="Validar contraseña"></TextInput>
            {/**Botones */}
            <Button title="Crear cuenta" />
            <Button title="Volver atrás" onPress={() => navigation.goBack()}/>
            <MyButton></MyButton>
        </View>
    );
}

export default RegisterScreen;