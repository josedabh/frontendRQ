import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../../App';
import HeaderNavigation from '../../../components/shared/HeaderNavigation';
import { ChallengeResponse } from '../../../shared/models/ChallengeData';
import { getChallengeById } from '../../../shared/services/ChallengeService';
import colors from '../../../shared/themes/constants/colors';
import textStyles from '../../../shared/themes/styles/textStyles';
import { RootTabParamList } from '../../Layout';

type ChallengeScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  "Challenge"
>;
type ChallengeScreenRouteProp = RouteProp<RootStackParamList, "Challenge">;

/**
 * Para coger la dimension del dispositivo
 * Ej: Movil, tablets
 */
const { width, height } = Dimensions.get("window");

/**Pantalla Retos donde se ve la informacion del reto elegido */
export default function ChallengeScreen() {
  const route = useRoute<ChallengeScreenRouteProp>();

  const [challenge, setChallenge] = useState<ChallengeResponse>({
    id: "",
    description: "",
    difficulty: "",
    endDate: "",
    points: 0,
    startDate: "",
    state: "",
    title: "",
  });

  const navigation = useNavigation<ChallengeScreenNavigationProp>();
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const reto = await getChallengeById(route.params.id);
        setChallenge(reto);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChallenge();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderNavigation onPress={() => navigation.goBack()} />
      {/**Donde empezaría la pag de retos */}
      <View style={styles.placeholder}>
        <View style={styles.placeholderInset}>
          <Text style={textStyles.title}>{challenge?.title}</Text>
          {/**Contenedor grid que contiene description, dificultad y categoria */}
          <View style={styles.container}>
            {/**Gird que contiene las dos columnas */}
            <View style={styles.grid}>
              {/* Columna Izquierda */}
              <View style={styles.leftColumn}>
                <View style={styles.box}>
                  <Text style={textStyles.normal}>
                    {challenge?.description}
                  </Text>
                </View>
              </View>
              {/* Columna Derecha */}
              <View style={styles.rightColumn}>
                <View style={styles.box}>
                  <Text>Dificultad: {challenge?.difficulty}</Text>
                </View>
                <View style={styles.box}>
                  <Text>Category: {challenge?.points}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text>Recompensas: {challenge?.points} puntos</Text>
          <Text>Validation</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const baseFontSize = width < 400 ? 14 : 16;

const styles = StyleSheet.create({
  placeholder: {
    // flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: 0,
    flex: 1,
    height: 400,
    marginTop: 0,
    padding: 24,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: colors.danger,
    borderRadius: 12,
    // flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: 0,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  leftColumn: {
    flex: 1,
    marginRight: 8,
  },
  rightColumn: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 8,
  },
  box: {
    flex: 1,
    backgroundColor: "#4e91fc",
    marginVertical: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
