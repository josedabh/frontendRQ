import { useState } from 'react';
import { Text, View } from 'react-native';

import globalStyles from '../../themes/styles/globalStyles';
import textStyles from '../../themes/styles/textStyles';
import MySearchBar from '../shared/MySearchBar';

interface HeaderProps {
    person: string;
}

/**Componente porpio de Home que saluda yu ayuda al usuario */
const HeaderHome: React.FC<HeaderProps> = ({ person }) => {
    return (
        <View style = { [globalStyles.card, {display: 'flex'} ] }>
            <Text style = { textStyles.title }> Hola , { person } </Text>
            <MySearchBar title = 'Search' />
        </View>
    );
};

export default HeaderHome;