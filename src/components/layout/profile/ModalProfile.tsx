import { Modal, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../../context/ThemeContext';
import { Theme } from '../../../shared/themes/themes';
import { MyButton } from '../../shared/MyButton';

interface ModalProfileProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  onAction: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

export function ModalProfile({
  title,
  visible,
  onClose,
  children,
  onAction,
  onCancel,
}: ModalProfileProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {children}
          <View style={styles.buttonsRow}>
            <MyButton
              title="Cancelar"
              onPress={onCancel}
              style={styles.cancelButton}
              textStyle={styles.cancelText}
            />
            <MyButton
              title="Aceptar"
              onPress={onAction}
              style={styles.confirmButton}
              textStyle={styles.confirmText}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "80%",
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
      fontWeight: "700",
      marginBottom: 16,
      textAlign: "center",
      color: theme.textTitle,
    },
    buttonsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: theme.buttonSecondary,
      marginRight: 8,
      paddingVertical: 12,
      borderRadius: 8,
    },
    confirmButton: {
      flex: 1,
      backgroundColor: theme.buttonPrimary,
      marginLeft: 8,
      paddingVertical: 12,
      borderRadius: 8,
    },
    cancelText: {
      color: theme.text,
      fontWeight: "600",
    },
    confirmText: {
      color: theme.buttonText,
      fontWeight: "600",
    },
  });
