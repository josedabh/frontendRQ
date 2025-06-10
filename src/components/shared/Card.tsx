import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import createTextStyles from '../../shared/themes/styles/textStyles';
import { Theme } from '../../shared/themes/themes';

interface CardProps {
  title: string;
  desc?: string;
  imageUri?: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ title, desc, imageUri, onPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const textStyles = createTextStyles(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.card}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : null}
      <View style={styles.content}>
        <Text style={[textStyles.title, styles.title]} numberOfLines={1}>
          {title}
        </Text>
        {desc && (
          <Text style={[textStyles.normal, styles.desc]} numberOfLines={2}>
            {desc}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      margin: 8,
      ...Platform.select({
        ios: {
          shadowColor: theme.shadowColor,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
          backgroundColor: theme.card,
        },
        web: {
          shadowColor: theme.shadowColor,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
      }),
    },
    image: {
      width: "100%",
      height: 160,
      borderRadius: 8,
      marginBottom: 12,
      backgroundColor: theme.backgroundAlt,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 6,
      color: theme.textTitle,
    },
    desc: {
      fontSize: 14,
      color: theme.textSubtitle,
      marginBottom: 12,
      lineHeight: 20,
    },
  });

export default Card;
