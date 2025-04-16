import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UserProfile } from '../../models/user-data';
import { useNavigation } from '@react-navigation/native';
import { MyButton } from '../../components/shared/MyButton/MyButton';
import textStyles from '../../themes/styles/textStyles';
import globalStyles from '../../themes/styles/globalStyles';

const user: UserProfile = {
    email: "bradpitt@hollywood.com",
    name: "Brad",
    lastname: "Pitt",
    numPhone: "654321123",
    points: 1222,
    username: "BradPitt"
}
/**Perfil del usuario nombre a cambiar */
export default function Datauser() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            {/** Información del usuario */}
            <View style = { globalStyles.card }>
                <Text
                    style = { textStyles.title}
                >
                Perfil de usuario
                </Text>
                <Text style = { textStyles.normal }> Nombre: { user.name }</Text>
                <Text style = { textStyles.normal }> Apellidos: { user.lastname }</Text>
                <Text style = { textStyles.normal }> Nombre de usuario: { user.username }</Text>
                <Text style = { textStyles.normal }> Correo electronico: { user.email }</Text>
                <Text style = { textStyles.normal }> Numero de teléfono: { user.numPhone }</Text>
                <Text style = { textStyles.normal }> Puntos: { user.points   }</Text>
            </View>
            { /** Boton */}
            <MyButton 
                title = 'Volver atrás'
                onPress={() => navigation.goBack()}
            />
        </SafeAreaView>
    )
}