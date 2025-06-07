import { StyleSheet } from 'react-native';

import colors from '../constants/colors';
import { Theme } from '../themes';

const createButtonStyles = (theme: Theme) => StyleSheet.create({
  button: {
    backgroundColor: theme.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonPrimary: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: theme.buttonText,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default createButtonStyles;
