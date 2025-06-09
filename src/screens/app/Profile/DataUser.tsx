import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MyButton } from '../../../components/shared/MyButton';
import { useTheme } from '../../../context/ThemeContext';
import { FormPassword, UserProfile } from '../../../shared/models/UserData';
import { changePassword, getMyUserInfo, updateUserInfo } from '../../../shared/services/UserService';
import createTextStyles from '../../../shared/themes/styles/textStyles';
import { Theme } from '../../../shared/themes/themes';

export default function Datauser() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const textStyles = createTextStyles(theme);
  const navigation = useNavigation();

  const [myUser, setMyUser] = useState<UserProfile>({
    email: "",
    lastname: "",
    name: "",
    numPhone: "",
    points: 0,
    username: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>(myUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [repeatPwd, setRepeatPwd] = useState("");

  useEffect(() => {
    fetchMyUser();
  }, []);

  const fetchMyUser = async () => {
    try {
      const myInfo = await getMyUserInfo();
      setMyUser(myInfo);
      setEditedUser(myInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateInfo = async () => {
    try {
      await updateUserInfo({
        name: editedUser.name,
        lastname: editedUser.lastname,
        email: editedUser.email,
        numPhone: editedUser.numPhone,
        username: editedUser.username
      });
      
      setMyUser(editedUser);
      setIsEditing(false);
      Alert.alert("Éxito", "Información actualizada correctamente");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Error al actualizar la información"
      );
    }
  };

  const handleChangePassword = async () => {
    try {
      // Validaciones básicas
      if (!currentPwd || !newPwd || !repeatPwd) {
        Alert.alert("Error", "Por favor, rellena todos los campos");
        return;
      }

      if (newPwd !== repeatPwd) {
        Alert.alert("Error", "Las contraseñas nuevas no coinciden");
        return;
      }

      // Crear objeto con el formato requerido por la API
      const formPassword: FormPassword = {
        oldPassword: currentPwd,
        newPassword: newPwd,
        verifyNewPassword: repeatPwd
      };

      console.log(formPassword);
      // Llamar a la API
      await changePassword(formPassword);
      
      // Limpiar campos y cerrar modal
      setCurrentPwd("");
      setNewPwd("");
      setRepeatPwd("");
      setModalVisible(false);
      
      Alert.alert("Éxito", "Contraseña actualizada correctamente");
    } catch (error: any) {
      Alert.alert(
        "Error", 
        error.response?.data?.message || "Error al actualizar la contraseña"
      );
    }
  };

  const renderField = (label: string, value: string, field: keyof UserProfile) => {
    if (field === 'points') {
      return (
        <>
          <Text style={styles.label}>{label}:</Text>
          <Text style={styles.text}>{value}</Text>
        </>
      );
    }

    return (
      <>
        <Text style={styles.label}>{label}:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedUser[field] as string}
            onChangeText={(text) => setEditedUser({ ...editedUser, [field]: text })}
            placeholder={`Ingrese ${label.toLowerCase()}`}
          />
        ) : (
          <Text style={styles.text}>{value}</Text>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={textStyles.title}>Perfil de usuario</Text>

        {renderField("Nombre", myUser.name, "name")}
        {renderField("Apellidos", myUser.lastname, "lastname")}
        {renderField("Nombre de usuario", myUser.username, "username")}
        {renderField("Correo electrónico", myUser.email, "email")}
        {renderField("Número de teléfono", myUser.numPhone, "numPhone")}
        {renderField("Puntos", myUser.points.toString(), "points")}

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <MyButton title="Guardar cambios" onPress={handleUpdateInfo} />
              <MyButton 
                title="Cancelar" 
                onPress={() => {
                  setIsEditing(false);
                  setEditedUser(myUser);
                }} 
              />
            </>
          ) : (
            <>
              <MyButton title="Editar información" onPress={() => setIsEditing(true)} />
              <MyButton title="Cambiar contraseña" onPress={() => setModalVisible(true)} />
              <MyButton title="Volver atrás" onPress={() => navigation.goBack()} />
            </>
          )}
        </View>
      </View>

      {/* Modal para cambio de contraseña */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={textStyles.title}>Cambiar Contraseña</Text>

            <TextInput
              style={styles.input}
              placeholder="Contraseña actual"
              secureTextEntry
              value={currentPwd}
              onChangeText={setCurrentPwd}
            />
            <TextInput
              style={styles.input}
              placeholder="Nueva contraseña"
              secureTextEntry
              value={newPwd}
              onChangeText={setNewPwd}
            />
            <TextInput
              style={styles.input}
              placeholder="Repetir nueva contraseña"
              secureTextEntry
              value={repeatPwd}
              onChangeText={setRepeatPwd}
            />

            <View style={styles.buttonRow}>
              <MyButton title="Actualizar" onPress={handleChangePassword} />
              <MyButton
                title="Cancelar"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: theme.background,
  },
  card: {
    backgroundColor: theme.card,
    borderRadius: 10,
    padding: 16,
    boxShadow: "#000",
    elevation: 3,
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: theme.accent,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    backgroundColor: theme.backgroundCard,
    color: theme.text,
  },
  inlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editText: {
    color: theme.primary,
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: theme.background,
    padding: 20,
    borderRadius: 12,
  },
});
