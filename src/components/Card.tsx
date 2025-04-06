import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';


interface CardProps {
    imageSource: ImageSourcePropType;
    title: string;
}

// Componente Card que recibe la imagen y el título como props
const Card: React.FC<CardProps> = ({ imageSource, title }) => {
    return (
        <View style={styles.card}>
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        // Sombra para iOS y Android
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: '90%',
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