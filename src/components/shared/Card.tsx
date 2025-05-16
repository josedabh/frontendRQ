import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions
} from 'react-native';

import textStyles from '../../shared/themes/styles/textStyles';

interface CardProps {
  title: string;
  desc?: string;
  imageUri?: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ title, desc, imageUri, onPress }) => {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.9; // 90% del ancho de pantalla

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, { width: cardWidth }]}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : null}
      <View style={styles.content}>
        <Text style={[textStyles.title, styles.title]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={[textStyles.normal, styles.desc]} numberOfLines={3}>
          {desc}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginVertical: 12,
    alignSelf: 'center',

    // Sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    // Elevación Android
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#eee',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default Card;