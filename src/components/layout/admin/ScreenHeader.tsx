import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../shared/themes/themes';
import createTextStyles from '../../../shared/themes/styles/textStyles';

export interface ScreenHeaderProps {
  /** Título centrado */
  title: string;
  /** Función para el botón izquierdo (p.ej. volver atrás) */
  onLeftPress?: () => void;
  /** Texto o icono en el botón izquierdo */
  leftLabel?: string;
  /** Función para el botón derecho si lo necesitas */
  onRightPress?: () => void;
  /** Texto o icono en el botón derecho */
  rightLabel?: string;
  /** Estilos extra para el contenedor */
  containerStyle?: ViewStyle;
  /** Estilos extra para el texto del título */
  titleStyle?: TextStyle;
}

export default function ScreenHeader({
  title,
  onLeftPress,
  leftLabel = '←',
  onRightPress,
  rightLabel,
  containerStyle,
  titleStyle,
}: ScreenHeaderProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.header, containerStyle]}>
      {onLeftPress ? (
        <TouchableOpacity onPress={onLeftPress}>
          <Text style={styles.sideButton}>{leftLabel}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.sidePlaceholder} />
      )}

      <Text style={[styles.title, titleStyle]}>{title}</Text>

      {onRightPress ? (
        <TouchableOpacity onPress={onRightPress}>
          <Text style={styles.sideButton}>{rightLabel}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.sidePlaceholder} />
      )}
    </View>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.backgroundCard,
    elevation: 2,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sideButton: {
    fontSize: 16,
    color: theme.backgroundAlt,
  },
  sidePlaceholder: {
    width: 40,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: theme.textTitle,
  },
});
