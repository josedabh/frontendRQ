import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../shared/themes/themes";
import createTextStyles from "../../shared/themes/styles/textStyles";

interface CardProps {
  title: string;
  desc?: string;
  imageUri?: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ title, desc, imageUri, onPress }) => {
  // Acceso al tema y estilos personalizados
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const textStyles = createTextStyles(theme);
  // Obtener dimensiones de la ventana para hacer el card responsivo
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 16,
      marginVertical: 12,
      alignSelf: "center",

      // Sombra iOS
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,

      // Elevación Android
      elevation: 4,
    },
    image: {
      width: "100%",
      height: 160,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: theme.backgroundAlt,
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 20,
      marginBottom: 8,
      color: theme.textTitle,
    },
    desc: {
      fontSize: 14,
      color: theme.textSubtitle,
      lineHeight: 20,
    },
  });

export default Card;
