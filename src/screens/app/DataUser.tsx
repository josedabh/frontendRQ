import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UserProfile } from '../../shared/models/UserData';
import { useNavigation } from '@react-navigation/native';
import { MyButton } from '../../components/shared/MyButton';
import textStyles from '../../shared/themes/styles/textStyles';
import globalStyles from '../../shared/themes/styles/globalStyles';
import { useEffect, useState } from 'react';
import { getMyUserInfo } from '../../shared/services/UserService';

/**Perfil del usuario nombre a cambiar */
export default function Datauser() {
    const navigation = useNavigation();
    const [myUser, setMyUser] = useState<UserProfile>({email:"", lastname:"",
        name:"", numPhone:"", points:0, username:""
    });

    useEffect(() => {
        const fetchMyUser = async () => {
            try {
                const myInfo = await getMyUserInfo();
                setMyUser(myInfo);
            } catch (error) {
                console.log(error)
            }
        };
        fetchMyUser();
    }, []);

    return (
        <SafeAreaView>
            {/** Información del usuario */}
            <View style = { globalStyles.card }>
                <Text
                    style = { textStyles.title}
                >
                Perfil de usuario
                </Text>
                <Text style = { textStyles.normal }> Nombre: { myUser.name }</Text>
                <Text style = { textStyles.normal }> Apellidos: { myUser.lastname }</Text>
                <Text style = { textStyles.normal }> Nombre de usuario: { myUser.username }</Text>
                <Text style = { textStyles.normal }> Correo electronico: { myUser.email }</Text>
                <Text style = { textStyles.normal }> Numero de teléfono: { myUser.numPhone }</Text>
                <Text style = { textStyles.normal }> Puntos: { myUser.points   }</Text>
            </View>
            { /** Boton */}
            <MyButton 
                title = 'Volver atrás'
                onPress={() => navigation.goBack()}
            />
        </SafeAreaView>
    )
}