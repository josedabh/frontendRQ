import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../shared/themes/themes';
import createTextStyles from '../../../shared/themes/styles/textStyles';

interface AssignVerificationModalProps {
    visible: boolean;
    onClose: () => void;
    onAssign: (type: string) => void;
}

const AssignVerificationModal: React.FC<AssignVerificationModalProps> = ({ visible, onClose, onAssign }) => {
    // Acceso al tema y estilos personalizados
    const { theme } = useTheme();
    const styles = createStyles(theme);
    
    //  State para el tipo de verificación seleccionado
    const [selectedType, setSelectedType] = useState<string>('');

    const handleAssign = () => {
        if (selectedType) {
            onAssign(selectedType);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View style={styles.backdrop}>
                <View style={styles.container}>
                    <Text style={styles.title}>Seleccionar tipo de verificación</Text>
                    
                    <TouchableOpacity 
                        style={[styles.option, selectedType === 'I' && styles.selectedOption]}
                        onPress={() => setSelectedType('I')}
                    >
                        <Text style={styles.optionText}>Verificación por imagen</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.option, selectedType === 'L' && styles.selectedOption]}
                        onPress={() => setSelectedType('L')}
                    >
                        <Text style={styles.optionText}>Verificación por ubicación</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.option, selectedType === 'Q' && styles.selectedOption]}
                        onPress={() => setSelectedType('Q')}
                    >
                        <Text style={styles.optionText}>Verificación por cuestionario</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonsRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={handleAssign}
                        >
                            <Text style={styles.confirmText}>Asignar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

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
        marginBottom: 16,
        textAlign: 'center',
        color: theme.textTitle,
    },
    option: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.border,
        marginBottom: 8,
    },
    selectedOption: {
        backgroundColor: theme.backgroundAlt,
        borderColor: theme.primary,
    },
    optionText: {
        fontSize: 16,
        color: theme.text,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
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
        backgroundColor: theme.buttonPrimary,
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

export default AssignVerificationModal;
