import { useNavigation } from '@react-navigation/native';
import { Alert, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MyButton } from '../../components/shared/MyButton';
import globalStyles from '../../shared/themes/styles/globalStyles';
import textStyles from '../../shared/themes/styles/textStyles';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

// Definir el tipo de navegación
type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

/** Pantalla de registro de usuario */
export function RegisterScreen() {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const { register } = useContext(AuthContext);

    // Estado para los campos del formulario
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Función para manejar el registro
    const handleRegister = async () => {
        // Validaciones básicas
        if (!formData.email || !formData.password || !formData.username) {
            Alert.alert('Error', 'Por favor, rellena todos los campos obligatorios');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
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
                password: formData.password
            };

            await register(userData);
            Alert.alert('Éxito', 'Cuenta creada correctamente');
            navigation.replace('Layout'); // Navega al home después del registro exitoso
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Error al crear la cuenta');
        }
    };
    return(
        <SafeAreaView style={{ padding: 16 }}>
            <Text style={textStyles.title}>Registrarse</Text>
            
            <TextInput 
                style={globalStyles.input} 
                placeholder="Nombre"
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
            />
            <TextInput 
                style={globalStyles.input} 
                placeholder="Apellidos"
                value={formData.lastname}
                onChangeText={(text) => setFormData({...formData, lastname: text})}
            />
            <TextInput 
                style={globalStyles.input} 
                placeholder="Nombre de usuario"
                value={formData.username}
                onChangeText={(text) => setFormData({...formData, username: text})}
            />
            <TextInput 
                style={globalStyles.input} 
                placeholder="Teléfono"
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
            />
            <TextInput 
                style={globalStyles.input} 
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput 
                style={globalStyles.input} 
                placeholder="Contraseña"
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                secureTextEntry
            />
            <TextInput 
                style={globalStyles.input} 
                placeholder="Validar contraseña"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                secureTextEntry
            />
            
            <MyButton title="Crear cuenta" onPress={handleRegister} />
            <MyButton title="Volver atrás" onPress={() => navigation.goBack()}/>
        </SafeAreaView>
    );
}

export default RegisterScreen;