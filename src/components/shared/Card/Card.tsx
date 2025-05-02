import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../../shared/themes/styles/globalStyles';
import { TouchableOpacity } from 'react-native';
import textStyles from '../../../shared/themes/styles/textStyles';


interface CardProps {
    title: string;
    desc: string;
    key?: React.Key;
    onPress?: () => void;
}

// Componente Card que recibe la imagen y el título como props
const Card: React.FC<CardProps> = ({title, desc, key, onPress }) => {
    return (
        <View key = { key } style = { globalStyles.card }>
            <TouchableOpacity
                onPress = { onPress }
            >
                <Text style = { styles.cardTitle }> { title } </Text>
                <Text style = { textStyles.normal }> { desc } </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 150,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 12,
    },
});

export default Card;