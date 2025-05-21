import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  sideButton: {
    fontSize: 16,
    color: '#4e91fc',
  },
  sidePlaceholder: {
    width: 40, // mismo espacio que el texto del botón
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});
