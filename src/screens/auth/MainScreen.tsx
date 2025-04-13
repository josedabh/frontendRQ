import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../App';
import { MyButton } from '../../components/shared/MyButton';

// Define las props del componente
type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;

export function MainScreen({ navigation }: MainScreenProps) {
    return (
        <SafeAreaView style = {{ padding: 16}}>
            <Text>MainScreen</Text>
            <Image 
            source={require("../../../assets/portada_rq.png")} 
            style = {{ width:300, height:300 }} />
            <MyButton title='Iniciar sesión'
            onPress = {() => navigation.navigate('Login')}
            />
        </SafeAreaView>
    );
}

export default MainScreen;