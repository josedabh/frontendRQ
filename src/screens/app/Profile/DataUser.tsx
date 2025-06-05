import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MyButton } from '../../../components/shared/MyButton';
import { UserProfile } from '../../../shared/models/UserData';
import { changePassword, getMyUserInfo } from '../../../shared/services/UserService';
import textStyles from '../../../shared/themes/styles/textStyles';

export default function Datauser() {
  const navigation = useNavigation();
  const [myUser, setMyUser] = useState<UserProfile>({
    email: "",
    lastname: "",
    name: "",
    numPhone: "",
    points: 0,
    username: "",
  });

  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [repeatPwd, setRepeatPwd] = useState("");

  useEffect(() => {
    const fetchMyUser = async () => {
      try {
        const myInfo = await getMyUserInfo();
        setMyUser(myInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyUser();
  }, []);

  const handleSaveName = () => {
    // Aquí podrías llamar a un endpoint para actualizar el nombre
    setMyUser({ ...myUser, name: nameInput });
    setEditName(false);
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
      const formPassword = {
        oldPassword: currentPwd,
        newPassword: newPwd,
        verifyNewPassword: repeatPwd
      };

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

  return (
    <SafeAreaView style = { styles.container }>
      <View style = { styles.card }>
        <Text style = { textStyles.title }>Perfil de usuario</Text>

        <Text style = { styles.label }>Nombre:</Text>
        { editName ? (
          <>
            <TextInput
              style = { styles.input }
              value = { nameInput }
              onChangeText = { setNameInput }
              placeholder = "Nuevo nombre"
            />
            <View style = { styles.buttonRow }>
              <MyButton title = "Guardar" onPress = { handleSaveName } />
              <MyButton title = "Cancelar" onPress = { () => setEditName(false) } />
            </View>
          </>
        ) : (
          <View style = { styles.inlineRow }>
            <Text style = { styles.text }>{ myUser.name }</Text>
            <TouchableOpacity
              onPress = { () => {
                setNameInput(myUser.name);
                setEditName(true);
              } }
            >
              <Text style = { styles.editText }>Editar</Text>
            </TouchableOpacity>
          </View>
        ) }

        <Text style = { styles.label }>Apellidos:</Text>
        <Text style = { styles.text }>{ myUser.lastname }</Text>

        <Text style = { styles.label }>Nombre de usuario:</Text>
        <Text style = { styles.text }>{ myUser.username }</Text>

        <Text style = { styles.label }>Correo electrónico:</Text>
        <Text style = { styles.text }>{ myUser.email }</Text>

        <Text style = { styles.label }>Número de teléfono:</Text>
        <Text style = { styles.text }>{ myUser.numPhone }</Text>

        <Text style = { styles.label }>Puntos:</Text>
        <Text style = { styles.text }>{ myUser.points }</Text>

        <MyButton
          title = "Cambiar contraseña"
          onPress = { () => setModalVisible(true) }
        />
        <MyButton title = "Volver atrás" onPress = { () => navigation.goBack() } />
      </View>

      { /* Modal para cambio de contraseña */ }
      <Modal visible = { modalVisible } animationType = "slide" transparent>
        <View style = { styles.modalBackground }>
          <View style = { styles.modalContent }>
            <Text style = { textStyles.title }>Cambiar Contraseña</Text>

            <TextInput
              style = { styles.input }
              placeholder = "Contraseña actual"
              secureTextEntry
              value = { currentPwd }
              onChangeText = { setCurrentPwd }
            />
            <TextInput
              style = { styles.input }
              placeholder = "Nueva contraseña"
              secureTextEntry
              value = { newPwd }
              onChangeText = { setNewPwd }
            />
            <TextInput
              style = { styles.input }
              placeholder = "Repetir nueva contraseña"
              secureTextEntry
              value = { repeatPwd }
              onChangeText = { setRepeatPwd }
            />

            <View style = { styles.buttonRow }>
              <MyButton title = "Actualizar" onPress = { handleChangePassword } />
              <MyButton
                title = "Cancelar"
                onPress = { () => setModalVisible(false) }
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  inlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editText: {
    color: "#007bff",
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },
});
