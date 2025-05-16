import React from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

import buttonStyles from '../../shared/themes/styles/buttonStyles';

/**Porpiedades a implementar el boton */
interface MyButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function MyButton({ style, onPress, title }: MyButtonProps) {
  return (
    <TouchableOpacity
      style={[buttonStyles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
