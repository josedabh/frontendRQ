import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RootStackParamList } from "../../../../App";
import colors from "../../../shared/themes/constants/colors";

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  startDate: string;
  endDate: string;
  points: number;
  verified: boolean;
}

export default function ManageChallengesScreen() {
  const navigation =
    useNavigation<
      BottomTabNavigationProp<RootStackParamList, "ManageChallenges">
    >();
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Reto Saludable",
      description: "Camina 10,000 pasos al día",
      difficulty: "easy",
      startDate: "2025-05-01T00:00:00",
      endDate: "2025-05-07T23:59:59",
      points: 50,
      verified: false,
    },
    {
      id: 2,
      title: "Reto Productividad",
      description: "Termina 3 tareas importantes",
      difficulty: "medium",
      startDate: "2025-05-10T00:00:00",
      endDate: "2025-05-12T23:59:59",
      points: 100,
      verified: true,
    },
    // ... más ejemplos
  ]);

  const onCreate = () => {
    navigation.navigate("AddChallenge");
  };

  const onEdit = (item: Challenge) => {
    console.log("Editar reto", item.id);
    // navegar a EditChallengeScreen con item
  };

  const onDelete = (item: Challenge) => {
    console.log("Borrar reto", item.id);
    setChallenges(challenges.filter((c) => c.id !== item.id));
  };

  const onVerify = (item: Challenge) => {
    console.log("Toggle verificación", item.id);
    setChallenges(
      challenges.map((c) =>
        c.id === item.id ? { ...c, verified: !c.verified } : c,
      ),
    );
  };

  const renderItem = ({ item }: { item: Challenge }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.small}>
          Dificultad: {item.difficulty} · Puntos: {item.points}
        </Text>
        <Text
          style={[
            styles.small,
            item.verified ? styles.verified : styles.unverified,
          ]}
        >
          {item.verified ? "Verificado" : "Pendiente verificación"}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionBtn}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item)}
          style={styles.actionBtn}
        >
          <Text style={styles.actionText}>Borrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onVerify(item)}
          style={styles.actionBtn}
        >
          <Text style={styles.actionText}>
            {item.verified ? "Desmarcar" : "Verificar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={onCreate} style={styles.createBtn}>
        <Text style={styles.createText}>➕ Crear Reto</Text>
      </TouchableOpacity>

      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={styles.empty}>No hay retos</Text>}
      />
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
  createText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
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
  desc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  small: {
    fontSize: 12,
    color: "#777",
  },
  verified: {
    color: colors.success,
  },
  unverified: {
    color: colors.danger,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});
