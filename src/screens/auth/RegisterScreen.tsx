import { useNavigation } from '@react-navigation/native';
import { Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MyButton } from '../../components/shared/MyButton/MyButton';
import globalStyles from '../../themes/styles/globalStyles';
import textStyles from '../../themes/styles/textStyles';

/** Pantalla de registro de usuario */
export function RegisterScreen() {
    const navigation = useNavigation();
    return(
        <SafeAreaView style = {{ padding: 16}}>
            <Text style = {textStyles.title}>Registrarse</Text>
            {/**Formulario de incripcion*/}
            <TextInput style = {globalStyles.input} placeholder="Nombre"></TextInput>
            <TextInput style = {globalStyles.input} placeholder="Apellidos"></TextInput>
            <TextInput style = {globalStyles.input} placeholder="Nombre de usuario"></TextInput>
            <TextInput style = {globalStyles.input} placeholder="Email"></TextInput>
            <TextInput style = {globalStyles.input} placeholder="Contraseña"></TextInput>
            <TextInput style = {globalStyles.input} placeholder="Validar contraseña"></TextInput>
            {/**Botones */}
            <MyButton title="Crear cuenta" />
            <MyButton title="Volver atrás" onPress={() => navigation.goBack()}/>
        </SafeAreaView>
    );
}

export default RegisterScreen;