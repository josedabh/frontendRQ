import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, TextInput, View } from 'react-native';

import { RootStackParamList } from '../../App';

// Define las props del componente
type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: RegisterScreenProps) {
    return(
        <View>
            <Text>Iniciar sesión</Text>
            <TextInput placeholder="Email/Usuario"></TextInput>
            <TextInput placeholder="Contraseña"></TextInput>
            <Button title="Entrar" />
            <Button title="Crear cuenta" onPress={() => navigation.navigate('Register')}/>
            <Button title="Volver" onPress={() => navigation.goBack()}/>
        </View>
    );
}

export default LoginScreen;