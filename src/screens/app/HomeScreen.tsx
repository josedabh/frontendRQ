import { useEffect, useState } from 'react';
import { StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderHome from '../../components/layout/header/HeaderHome';
import { UserProfile } from '../../shared/models/UserData';
import { getMyUserInfo } from '../../shared/services/UserService';
import textStyles from '../../shared/themes/styles/textStyles';

/** Pagina main que sale al principio cuadno ya estas logeado */
export default function HomeScreen() {
    const [user, setUser] = useState<UserProfile | null>();
    useEffect(() => {
        const fetchData = async () => {
            const myUser = await getMyUserInfo();
            setUser(myUser);
        };
        fetchData();
    }, []);

    //Nombre completo del usuario
    const fullName = user?.name + " " + user?.lastname;
    return (
        <SafeAreaView style={{ padding: 16 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Text style={textStyles.title}> Routine Quest </Text>
            <HeaderHome person={fullName != undefined ? fullName : "Brad Pitt"} />
            <Text style={textStyles.subtitle}> Top Retos </Text>
            <Text style={textStyles.subtitle}> Retos Actuales </Text>
            <Text style={textStyles.subtitle}> * Ver Recompensas Populares </Text>
        </SafeAreaView>
    );
}
