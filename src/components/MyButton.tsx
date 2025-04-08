import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import buttonStyles from '../themes/styles/buttonStyles';

const MyButton = () => {
  return (
    <TouchableOpacity style={buttonStyles.button} onPress={() => console.log('Presionado')}>
      <Text style={buttonStyles.buttonText}>Enviar</Text>
    </TouchableOpacity>
  );
};


export default MyButton;