import { StyleSheet } from 'react-native';

import colors from '../constants/colors';
import { Theme } from '../themes';

/** Estilos para los textos */
const createTextStyles = (theme: Theme) => StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.textTitle,
    marginBottom: 12,
    //Centra el texto
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.textSubtitle,
    margin: 6,
  },
  normal: {
    fontSize: 16,
    margin: 3,
    color: theme.text,
  },
});

export default createTextStyles;
