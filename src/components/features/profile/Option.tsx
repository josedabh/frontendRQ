import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'; // Asegúrate de tener esta importación
import colors from '../../../shared/themes/constants/colors';

interface OptionProps {
  title: string;
  onPress?: () => void;
}

const Option: React.FC<OptionProps>  = ({ title, onPress }) => {
  return (
    <View style = { styles.cardWrapper }>
      <TouchableOpacity
        onPress = { onPress }
      >
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}> { title }</Text>
          </View>

          <View style={styles.cardAction}>
            <FeatherIcon
              color = { colors.success }
              name = "chevron-right"
              size = {22}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Ejemplo de estilos básicos (debes completarlos según tu necesidad)
const styles = StyleSheet.create({
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardAction: {
    paddingRight: 16,
  },
});

export default Option;