import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../../../App';
import colors from '../../shared/themes/constants/colors';

export default function ManageUsersScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList, "ManageUsers">>();

  const onCreate = () => {
    navigation.navigate("AdminHome");
  };
  return (
    <SafeAreaView style={{ padding: 16 }}>
      <View style={styles.container}>
        {/* Header personalizado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("AdminHome")}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Administrar Recompensas</Text>
        </View>
        <TouchableOpacity onPress={onCreate} style={styles.createBtn}>
          <Text style={styles.createText}>➕ Crear Producto</Text>
        </TouchableOpacity>
        <Text>Gestión de Usuarios</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  createBtn: {
    backgroundColor: colors.primary,
    padding: 14,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  btnCancel: {
    backgroundColor: colors.danger,
  },
  createText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
