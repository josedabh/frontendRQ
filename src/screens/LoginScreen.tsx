import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Button, Text, TextInput, View } from 'react-native';

import { RootStackParamList } from '../../App';
import globalStyles from '../themes/styles/globalStyles';
import { MyButton } from '../components/shared/MyButton';

import textStyles from '../themes/styles/textStyles';
import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../components/context/AuthContext';
import { prueba } from '../services/UserService';

// Define las props del componente
type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: RegisterScreenProps) {
    // const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
      const fetchMensaje = async () => {
        try {
          const texto = await prueba();
          setMensaje(texto);
        } catch (error) {
          setMensaje('Error al cargar el mensaje');
        }
      };
  
      fetchMensaje();
    }, []);

    const handleLogin = async () => {
        try {
          // await login(email, password);
          Alert.alert('Login correcto', 'Bienvenido a la app');
        } catch (error: any) {
          Alert.alert('Error', error.message);
        }
      };
    return(
        <View style={{ padding: 16 }}>
            <Text style = {textStyles.title}>Iniciar sesión</Text>
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
            <MyButton title="Crear cuenta" onPress={() => navigation.navigate('Register')} />
            <MyButton title="Volver" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default LoginScreen;