import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import haversine from 'haversine';
import { useContext, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { MyButton } from '../../../components/shared/MyButton';
import { AuthContext } from '../../../context/AuthContext';
import { completeChallenge } from '../../../shared/services/ChallengeService';

interface ValidationDistanceScreenProps {
  challenge: {
    id: string;
    verificationType: string;
    requiredDistance?: number;
  };
}

export default function ValidationDistanceScreen({ challenge }: ValidationDistanceScreenProps) {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const [distance, setDistance] = useState(0);
  const [watching, setWatching] = useState(false);
  const previousLocation = useRef<Location.LocationObject | null>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    if (challenge.verificationType === "L") {
      startTracking();
    }

    return () => {
      stopTracking();
    };
  }, []);

  const stopTracking = async () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
    }
  };

  const startTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Error", "Necesitamos permisos de ubicación para validar el reto");
        return;
      }

      setWatching(true);

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => {
          if (previousLocation.current) {
            const start = {
              latitude: previousLocation.current.coords.latitude,
              longitude: previousLocation.current.coords.longitude,
            };
            const end = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };

            const dist = haversine(start, end);
            setDistance((prev) => prev + dist);
          }
          previousLocation.current = location;
        }
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo iniciar el seguimiento de ubicación");
      setWatching(false);
    }
  };

  const handleCompletion = async () => {
    try {
      if (!userToken) {
        Alert.alert("Error", "No estás autenticado");
        return;
      }

      await completeChallenge({
        challengeId: challenge.id,
        type: "L",
        distance,
      });

      Alert.alert(
        "Éxito",
        "Reto completado correctamente",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo completar el reto");
    }
  };

  const requiredDistance = challenge.requiredDistance || 10; // distancia por defecto 10km

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validación de Distancia</Text>
      <Text style={styles.distance}>
        Distancia recorrida: {distance.toFixed(2)} km
      </Text>
      <Text style={styles.required}>
        Distancia requerida: {requiredDistance} km
      </Text>
      {distance >= requiredDistance && (
        <MyButton 
          title="Completar Reto" 
          onPress={handleCompletion}
          style={styles.button}
        />
      )}
      <MyButton 
        title="Cancelar" 
        onPress={() => navigation.goBack()}
        style={styles.cancelButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  distance: {
    fontSize: 18,
    marginBottom: 10,
  },
  required: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
  cancelButton: {
    marginTop: 10,
    width: '80%',
    backgroundColor: '#ff4444',
  },
});