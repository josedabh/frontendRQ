import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../../shared/themes/constants/colors";

interface Product {
  id: number;
  name: string;
  description: string;
  points: number;
  image?: string;
  active: boolean;
  stock: number;
}

export default function ManageProductsScreen() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Reward 1",
      description: "Reward 1 description",
      points: 100,
      active: true,
      stock: 5,
    },
    {
      id: 2,
      name: "Reward 2",
      description: "Reward 2 description",
      points: 200,
      active: false,
      stock: 0,
    },
    // ...más productos de ejemplo
  ]);

  const onCreate = () => {
    console.log("Crear producto");
    // navigate a AddProduct o abrir modal
  };

  const onEdit = (item: Product) => {
    console.log("Editar producto", item.id);
    // navigate a EditProduct con item
  };

  const onDelete = (item: Product) => {
    console.log("Borrar producto", item.id);
    // Alert.alert('Confirmar', '¿Seguro que quieres borrar?', [{...}])
    setProducts(products.filter((p) => p.id !== item.id));
  };

  const onToggleActive = (item: Product) => {
    console.log("Toggle active", item.id);
    setProducts(
      products.map((p) => (p.id === item.id ? { ...p, active: !p.active } : p)),
    );
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.small}>
          Puntos: {item.points} · Stock: {item.stock}
        </Text>
        <Text style={[styles.small, !item.active && styles.inactive]}>
          {item.active ? "Activo" : "Inactivo"}
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
          onPress={() => onToggleActive(item)}
          style={styles.actionBtn}
        >
          <Text style={styles.actionText}>
            {item.active ? "Desactivar" : "Activar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={onCreate} style={styles.createBtn}>
        <Text style={styles.createText}>➕ Crear Producto</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={styles.empty}>No hay productos</Text>}
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
    backgroundColor: "#4e91fc",
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
  inactive: {
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
