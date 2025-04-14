import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    // Sombra para iOS y Android
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '90%',
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  tabBar: {
    position: 'absolute', // Posiciona el tab bar fijo en la parte inferior
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    borderTopWidth: 0,
    backgroundColor: '#ffffff',
    height: 60,
  },
});

export default globalStyles;
