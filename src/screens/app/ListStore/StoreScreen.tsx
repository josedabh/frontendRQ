import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../../App';
import HeaderNavigation from '../../../components/shared/HeaderNavigation';
import { MyButton } from '../../../components/shared/MyButton';
import { RewardResponse } from '../../../shared/models/StoreData';
import { buyReward, getRewardById } from '../../../shared/services/StoreService';
import colors from '../../../shared/themes/constants/colors';
import textStyles from '../../../shared/themes/styles/textStyles';

type StoreScreenRouteProp = RouteProp<RootStackParamList, "Store">;
type StoreScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList,
  "Store"
>;

const { width } = Dimensions.get("window");

export default function StoreScreen() {
  const route = useRoute<StoreScreenRouteProp>();
  const navigation = useNavigation<StoreScreenNavigationProp>();
  const [reward, setReward] = useState<RewardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const data = await getRewardById(route.params.id);
        setReward(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchReward();
  }, []);

  const handleBuyReward = () => {
    try {
      buyReward(route.params.id);
      navigation.goBack();
    } catch (error) {
      console.error("Error al comprar la recompensa:", error);
      Alert.alert("Error", "No se pudo comprar la recompensa");
    }
  }
  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!reward) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={textStyles.normal}>Recompensa no encontrada.</Text>
      </SafeAreaView>
    );
  }

  const isAvailable = reward.visible && reward.stock > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <HeaderNavigation onPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Imagen arriba */}
        {reward.image ? (
          <Image
            source={{ uri: reward.image }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <Text style={textStyles.normal}>Sin imagen</Text>
          </View>
        )}

        {/* Nombre y estado */}
        <Text style={textStyles.title}>{reward.name}</Text>
        {reward.stock === 0 && (
          <Text style={styles.unavailable}>Agotado</Text>
        )}

        {/* Grid de detalles */}
        <View style={styles.detailsGrid}>
          <View style={styles.leftCol}>
            <View style={styles.box}>
              <Text style={textStyles.normal}>{reward.description}</Text>
            </View>
          </View>
          <View style={styles.rightCol}>
            <View style={styles.box}>
              <Text style={textStyles.normal}>Puntos: {reward.points}</Text>
            </View>
            <View style={styles.box}>
              <Text style={textStyles.normal}>Stock: {reward.stock}</Text>
            </View>
          </View>
        </View>

        {/* Acción si está disponible */}
        {isAvailable &&
          <MyButton
            title="Reclamar"
            style={textStyles.normal}
            onPress={handleBuyReward}
          />}
        {/* Botón de volver */}
        <MyButton
          title="Volver"
          style={styles.btnCancel}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}


const baseFontSize = width < 400 ? 14 : 16;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  image: {
    width: "80%",
    height: width * 0.6,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginBottom: 16,
  },
  noImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  unavailable: {
    color: colors.danger,
    marginTop: 4,
    marginBottom: 8,
    fontSize: baseFontSize,
  },
  detailsGrid: {
    flexDirection: "row",
    marginTop: 16,
  },
  leftCol: {
    flex: 1,
    paddingRight: 8,
  },
  rightCol: {
    flex: 1,
    justifyContent: "space-between",
    paddingLeft: 8,
  },
  box: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  actionBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: colors.success,
    borderRadius: 8,
    alignItems: "center",
  },
  btnCancel: {
    backgroundColor: colors.danger,
  },
});
