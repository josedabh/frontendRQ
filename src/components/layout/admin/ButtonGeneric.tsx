import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../shared/themes/themes';

export interface ButtonProps {
    /** Texto del botón */
    label: string;
    /** Acción al pulsar */
    onPress: () => void;
    /** Estilos extra para el contenedor */
    containerStyle?: ViewStyle;
    /** Estilos extra para el texto */
    textStyle?: TextStyle;
    /** Si lo quieres deshabilitado */
    disabled?: boolean;
    /** Prefijo (por ejemplo un icono como ✓, ➕, etc) */
    prefix?: string;
    /** Sufijo (por ejemplo un icono) */
    suffix?: string;
}

export default function ButtonGeneric({
    label,
    onPress,
    containerStyle,
    textStyle,
    disabled = false,
    prefix,
    suffix,
}: ButtonProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, containerStyle]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <Text style={[styles.text, textStyle]}>
                {prefix && `${prefix} `}
                {label}
                {suffix && ` ${suffix}`}
            </Text>
        </TouchableOpacity>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    button: {
        backgroundColor: theme.buttonPrimary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    text: {
        color: theme.buttonText,
        fontSize: 16,
        fontWeight: '600',
    },
    disabled: {
        opacity: 0.6,
    },
});
