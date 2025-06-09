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
  disabled?: boolean; // Nueva prop para deshabilitar
}

export function MyButton({ 
  style, 
  textStyle, 
  onPress, 
  title, 
  disabled = false 
}: MyButtonProps) {
  const { theme } = useTheme();
  const buttonStyles = createButtonStyles(theme);
  
  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        style,
        disabled && buttonStyles.buttonDisabled
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[
        buttonStyles.buttonText,
        textStyle,
        disabled && buttonStyles.buttonTextDisabled
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
