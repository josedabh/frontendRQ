import { Modal, StyleSheet, Text, View } from "react-native";

import colors from "../../../shared/themes/constants/colors";
import { MyButton } from "../../shared/MyButton";

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
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}> {title} </Text>
        <View style={styles.containerBtn}>
          <MyButton style={styles.btn} title="Cancelar" onPress={onCancel} />
          <MyButton title="Aceptar" onPress={onAction} />
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    boxShadow: colors.shadow,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  btn: {
    backgroundColor: colors.backgroundDark,
  },
});
