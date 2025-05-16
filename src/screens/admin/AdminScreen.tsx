import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import colors from "../../shared/themes/constants/colors";
import Card from "../../components/shared/Card";

type AdminStackParamList = {
  AdminHome: undefined;
  AddChallenge: undefined;
  ManageChallenges: undefined;
  ManageProducts: undefined;
  ManageUsers: undefined;
};

type AdminNavProp = NativeStackNavigationProp<AdminStackParamList, "AdminHome">;

export default function AdminScreen() {
  const navigation = useNavigation<AdminNavProp>();

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <Text style={styles.title}>Panel de Control</Text>
      <View style={styles.buttonsContainer}>
        <Card
          title="📝 Administrar Retos"
          onPress={() => navigation.navigate("ManageChallenges")}
        />
        <Card
          title="📦 Administrar Productos"
          onPress={() => navigation.navigate("ManageProducts")}
        />
        <Card
          title="👥 Control de Usuarios"
          onPress={() => navigation.navigate("ManageUsers")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 16, // si no lo soporta tu RN, usa marginBottom en cada botón
  },
  button: {
    backgroundColor: "#4e91fc",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    // sombra iOS
    boxShadow: colors.shadow,
    // elevación Android
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});
