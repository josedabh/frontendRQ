import { useState } from 'react';
import { Text, View } from 'react-native';

import globalStyles from '../../themes/styles/globalStyles';
import textStyles from '../../themes/styles/textStyles';
import MySearchbar from '../SearchBar';

interface HeaderProps {
    person: string;
}

/**Componente porpio de Home que saluda yu ayuda al usuario */
const HeaderHome: React.FC<HeaderProps> = ({ person }) => {
    return (
        <View style = { [globalStyles.card, {display: 'flex'} ] }>
            <Text style = { textStyles.title }> Hola , { person } </Text>
            <MySearchbar title = 'Search'></MySearchbar>
        </View>
    );
};

export default HeaderHome;