import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Button, Text, TextInput, View } from 'react-native';

import { RootStackParamList } from '../../App';
import globalStyles from '../themes/styles/globalStyles';
import textStyles from '../themes/styles/textStyles';
import { useContext, useState } from 'react';
import { AuthContext } from '../components/context/AuthContext';

// Define las props del componente
type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: RegisterScreenProps) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
          await login(email, password);
          Alert.alert('Login correcto', 'Bienvenido a la app');
        } catch (error: any) {
          Alert.alert('Error', error.message);
        }
      };
    return(
        <View style={{ padding: 16 }}>
            <Text style = {textStyles.title}>Iniciar sesión</Text>
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
            <Button title="Iniciar sesión" onPress={handleLogin} />
s            <Button title="Crear cuenta" onPress={() => navigation.navigate('Register')} />
            <Button title="Volver" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default LoginScreen;