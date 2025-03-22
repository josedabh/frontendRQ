import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Image, Text, View } from 'react-native';

import { RootStackParamList } from '../../App';

// Define las props del componente
type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;

export function MainScreen({ navigation }: MainScreenProps) {
    return (
        <View>
            <Text>MainScreen</Text>
            <Image 
            source={require("../../assets/portada_rq.png")} 
            style = {{ width:300, height:300 }} />
            <Button title='Iniciar sesión'
            onPress = {() => navigation.navigate('Login')}
            />
        </View>
    );
}

export default MainScreen;