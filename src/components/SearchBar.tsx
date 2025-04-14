import { Alert, TextInput, View } from 'react-native';

import { MyButton } from './shared/MyButton';
import { useState } from 'react';

interface SearchProps {
    title: string;
}

/**Logica de busca y el componete para usarla */
const MySearchbar: React.FC<SearchProps>  = ({ title }) => {
    //Creo que es un hook para el input
    const [search, setsearch] = useState('');
    //Funciona que muestra lo que buscas
    function onSearch () {
        Alert.alert( "Buscando " + search );
    }
    return (
        <View>
            <TextInput 
                placeholder = 'Buscar Reto' 
                onChangeText = { setsearch } 
                value = { search }
            />
            <MyButton title = { title } onPress = { onSearch }/>
        </View>
    );
}

export default MySearchbar;