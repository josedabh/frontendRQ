import React from 'react';
import { GestureResponderEvent, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../shared/themes/themes';

interface ConfirmModalProps {
    visible: boolean;
    title?: string;
    message?: string;
    onConfirm: (event: GestureResponderEvent) => void;
    onCancel: (event: GestureResponderEvent) => void;
}

export default function ConfirmModal({
    visible,
    title = 'Confirmar acción',
    message = '¿Estás seguro?',
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.backdrop}>
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        backgroundColor: theme.card,
        borderRadius: 12,
        padding: 20,
        elevation: 6,
        shadowColor: theme.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
        color: theme.textTitle,
    },
    message: {
        fontSize: 14,
        color: theme.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: theme.buttonSecondary,
        marginRight: 8,
    },
    confirmButton: {
        backgroundColor: theme.error,
        marginLeft: 8,
    },
    cancelText: {
        color: theme.text,
        fontWeight: '600',
    },
    confirmText: {
        color: theme.buttonText,
        fontWeight: '600',
    },
});
