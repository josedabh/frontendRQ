import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import buttonStyles from '../../../shared/themes/styles/buttonStyles';

/**Porpiedades a implementar el boton */
interface MyButtonProps {
  style?: object;
  onPress?: () => void;
  title: string
}

export function MyButton({ style, onPress, title }: MyButtonProps) {
  const buttonStyle = style !== undefined ? [buttonStyles.button, style] : buttonStyles.button;
  return (
    <TouchableOpacity 
      style={buttonStyle}
      onPress={onPress}
    >
      <Text style = { buttonStyles.buttonText }> { title } </Text>
    </TouchableOpacity>
  );
};
