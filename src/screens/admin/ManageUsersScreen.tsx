import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../../shared/themes/constants/colors';
import { AdminStackParamList } from './AdminStackScreen';
import { FlatList } from 'react-native-gesture-handler';
import { UserResponse } from '../../shared/models/UserData';
import { useEffect, useState } from 'react';
import { getListUsers } from '../../shared/services/UserService';

export default function ManageUsersScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<AdminStackParamList, "ManageUsers">>();

  const [users, setUsers] = useState<UserResponse[]>([
    {
      id: "",
      email: "",
      name: "",
      password: "",
      lastname: "",
      username: "",
      numPhone: "",
      points: 0,
      rol: "",
    }
  ]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getListUsers();
        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, []);
  /** Card usuarios renderizados */
  const renderUsers = ({ item }: { item: UserResponse }) => {
    return (
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.title}>{item.name} {item.lastname}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionBtn}>
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSeeHistorial(item)} style={styles.actionBtn}>
            <Text style={styles.actionText}>Ver historial</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const onEdit = (item: UserResponse) => {
    // Con id: modo “editar”
    // navigation.navigate('AddUser', { id: item.id });
    console.log("Edit user", item);
  };
  
  const onSeeHistorial = (item: UserResponse) => {
    // Con id: modo “editar”
    // navigation.navigate('AddUser', { id: item.id });
    console.log("See historial user", item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header personalizado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("AdminHome")}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gestión de Usuarios</Text>
        </View>
        {/**Lista de usuarios */}
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUsers}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={<Text style={styles.empty}>No hay productos</Text>}
        />
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  info: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  list: {
    paddingHorizontal: -4,
    padding: 20,
  },
  separator: {
    height: 12,
  }, 
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 16,
  },
    actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 6,
  },
  actionText: {
    fontSize: 12,
    color: "#333",
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
