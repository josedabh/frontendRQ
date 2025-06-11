import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert, BackHandler } from 'react-native';
import * as Network from 'expo-network';

const PermissionHandler = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        // Verificar estado de red
        const networkState = await Network.getNetworkStateAsync();
        if (!networkState.isConnected) {
          Alert.alert(
            "Sin conexión",
            "La aplicación necesita acceso a internet para funcionar"
          );
        }

        // Solicitar permisos en Android
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_NETWORK_STATE,
            PermissionsAndroid.PERMISSIONS.INTERNET,
            PermissionsAndroid.PERMISSIONS.ACCESS_WIFI_STATE,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ]);

          const missingPermissions = Object.entries(granted)
            .filter(([_, value]) => value !== PermissionsAndroid.RESULTS.GRANTED)
            .map(([key]) => key);

          if (missingPermissions.length > 0) {
            Alert.alert(
              "Permisos requeridos",
              "La aplicación necesita los siguientes permisos para funcionar correctamente:\n\n" +
              "• Acceso a Internet\n" +
              "• Estado de la red\n" +
              "• Ubicación (para validación de retos)\n\n" +
              "Por favor, concede estos permisos para continuar.",
              [
                { text: "Reintentar", onPress: () => requestPermissions() },
                { text: "Salir", onPress: () => BackHandler.exitApp() }
              ]
            );
          }
        }
      } catch (err) {
        console.warn('Error al solicitar permisos:', err);
      }
    };

    requestPermissions();
  }, []);

  return null;
};

export default PermissionHandler;