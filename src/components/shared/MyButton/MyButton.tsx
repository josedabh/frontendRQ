import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import buttonStyles from '../../../shared/themes/styles/buttonStyles';

/**Porpiedades a implementar el boton */
interface MyButtonProps {
  onPress?: () => void;
  title: string
}

export function MyButton({ onPress, title }: MyButtonProps) {
  return (
    <TouchableOpacity 
      style = { buttonStyles.button } 
      onPress={onPress}>
      <Text style = { buttonStyles.buttonText }> { title } </Text>
    </TouchableOpacity>
  );
};
