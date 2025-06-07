import React from "react";
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import createButtonStyles from "../../shared/themes/styles/buttonStyles";

/**Porpiedades a implementar el boton */
interface MyButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function MyButton({ style, textStyle, onPress, title }: MyButtonProps) {
  const { theme } = useTheme();
  const buttonStyles = createButtonStyles(theme);
  
  return (
    <TouchableOpacity
      style={[buttonStyles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[buttonStyles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
