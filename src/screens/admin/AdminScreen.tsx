import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AdminStackParamList = {
  AdminHome: undefined;
  AddChallenge: undefined;
  ManageChallenges: undefined;
  ManageProducts: undefined;
  ManageUsers: undefined;
};

type AdminNavProp = NativeStackNavigationProp<AdminStackParamList, 'AdminHome'>;

export default function AdminScreen() {
  const navigation = useNavigation<AdminNavProp>();

  const Button = ({ label, onPress }: { label: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <Text style={styles.title}>Panel de Control</Text>
      <View style={styles.buttonsContainer}>
        <Button
          label="➕ Crear Reto"
          onPress={() => navigation.navigate('AddChallenge')}
        />
        <Button
          label="📝 Administrar Retos"
          onPress={() => navigation.navigate('ManageChallenges')}
        />
        <Button
          label="📦 Administrar Productos"
          onPress={() => navigation.navigate('ManageProducts')}
        />
        <Button
          label="👥 Control de Usuarios"
          onPress={() => navigation.navigate('ManageUsers')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 16, // si no lo soporta tu RN, usa marginBottom en cada botón
  },
  button: {
    backgroundColor: '#4e91fc',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    // sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    // elevación Android
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
