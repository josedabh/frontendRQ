import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, View } from 'react-native';

import globalStyles from '../themes/styles/globalStyles';
import textStyles from '../themes/styles/textStyles';
import { MyButton } from '../components/shared/MyButton';

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
            <MyButton title="Crear cuenta" />
            <MyButton title="Volver atrás" onPress={() => navigation.goBack()}/>
        </View>
    );
}

export default RegisterScreen;