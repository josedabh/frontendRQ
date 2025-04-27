import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../../shared/themes/styles/globalStyles';
import { TouchableOpacity } from 'react-native';


interface CardProps {
    imageSource: ImageSourcePropType;
    title: string;
    key?: React.Key;
    onPress?: () => void;
}

// Componente Card que recibe la imagen y el título como props
const Card: React.FC<CardProps> = ({ imageSource, title, key, onPress }) => {
    return (
        <View key = { key } style = { globalStyles.card }>
            <TouchableOpacity
                onPress = { onPress }
            >
            <Image source = { imageSource } style = { styles.image } />
            <Text style = { styles.cardTitle }> { title } </Text>
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