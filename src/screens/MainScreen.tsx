import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { RootStackParamList } from '../../App';
import { MyButton } from '../components/shared/MyButton';

// Define las props del componente
type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;

export function MainScreen({ navigation }: MainScreenProps) {
    return (
        <View>
            <Text>MainScreen</Text>
            <Image 
            source={require("../../assets/portada_rq.png")} 
            style = {{ width:300, height:300 }} />
            <MyButton title='Iniciar sesión'
            onPress = {() => navigation.navigate('Login')}
            />
        </View>
    );
}

export default MainScreen;