import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UserResponse } from '../../shared/models/UserData';
import { getListUsers } from '../../shared/services/UserService';
import colors from '../../shared/themes/constants/colors';
import textStyles from '../../shared/themes/styles/textStyles';

export default function ChallengeScreen() {
    const [pruebaUsers, setPruebaUsers] = useState<UserResponse[]>([]);

    useEffect(() => {
        const fetchMensaje = async () => {
            try {
                const users = await getListUsers();
                setPruebaUsers(users);
            } catch (error) {
                console.log(error)
            }
        };

        fetchMensaje();
    }, []);

    return (
        <SafeAreaView style = {{flex:1}}>
            
            {/**Donde empezaría la pag de retos */}
            <View style = { styles.placeholder }>
                <View style = { styles.placeholderInset }>
                    <Text style = { textStyles.title }>
                        Nombre Reto
                    </Text>
                    <Text style={textStyles.normal}>
                        Description
                    </Text>
                    <Text style={styles.jsonText}>
                        {JSON.stringify(pruebaUsers, null, 2)}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    placeholder: {
        // flexGrow: 1,
        // flexShrink: 1,
        // flexBasis: 0,
        flex: 1,
        height: 400,
        marginTop: 0,
        padding: 24,
        backgroundColor: 'transparent',
    },
    placeholderInset: {
        borderWidth: 4,
        borderColor: colors.danger,
        borderRadius: 12,
        // flexGrow: 1,
        // flexShrink: 1,
        // flexBasis: 0,
        flex:1
    },
    jsonText: {
        marginTop: 16,
        fontSize: 14,
        color: colors.backgroundDark,
        backgroundColor: colors.backgroundLight,
        padding: 8,
        borderRadius: 8,
        fontFamily: 'monospace', // Para que se vea como código
    },
});