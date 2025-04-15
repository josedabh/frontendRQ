import { Alert, TextInput, View } from 'react-native';

import { MyButton } from './MyButton';
import { useState } from 'react';
import colors from '../../themes/constants/colors';
import globalStyles from '../../themes/styles/globalStyles';

interface SearchProps {
    title: string;
}

/**Logica de busca y el componete para usarla */
const MySearchBar: React.FC<SearchProps>  = ({ title }) => {
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
                style = { globalStyles.input }
            />
            <MyButton title = { title } onPress = { onSearch }/>
        </View>
    );
}

export default MySearchBar;