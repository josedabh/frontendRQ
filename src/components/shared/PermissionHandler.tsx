import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert, BackHandler } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const PermissionHandler = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        // Check network first
        const networkState = await NetInfo.fetch();
        if (!networkState.isConnected) {
          Alert.alert(
            "Error de Conexión",
            "No hay conexión a Internet. La aplicación necesita conexión para funcionar.",
            [
              { 
                text: "Reintentar", 
                onPress: () => requestPermissions() 
              },
              { 
                text: "Salir", 
                onPress: () => BackHandler.exitApp(),
                style: 'cancel' 
              }
            ],
            { cancelable: false }
          );
          return;
        }

        // Android permissions
        if (Platform.OS === 'android') {
          const permissions = [
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_NETWORK_STATE,
            PermissionsAndroid.PERMISSIONS.INTERNET
          ];

          const granted = await PermissionsAndroid.requestMultiple(permissions);

          const missingPermissions = Object.entries(granted)
            .filter(([_, value]) => value !== PermissionsAndroid.RESULTS.GRANTED)
            .map(([key]) => key);

          if (missingPermissions.length > 0) {
            Alert.alert(
              "Permisos Requeridos",
              "Se necesitan los siguientes permisos:\n\n" +
              "• Ubicación (para validar retos)\n" +
              "• Internet\n" +
              "• Estado de red\n",
              [
                { 
                  text: "Reintentar", 
                  onPress: () => requestPermissions() 
                },
                { 
                  text: "Salir", 
                  onPress: () => BackHandler.exitApp(),
                  style: 'cancel' 
                }
              ],
              { cancelable: false }
            );
          }
        }
      } catch (err) {
        console.warn('Error solicitando permisos:', err);
        Alert.alert(
          "Error",
          "No se pudieron verificar los permisos necesarios.",
          [
            { text: "Reintentar", onPress: () => requestPermissions() },
            { text: "Salir", onPress: () => BackHandler.exitApp() }
          ]
        );
      }
    };

    requestPermissions();

    // Set up network listener
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          "Sin Conexión",
          "Se ha perdido la conexión a Internet",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default PermissionHandler;