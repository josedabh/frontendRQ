import React, { useEffect } from 'react';
import { Platform, Alert, BackHandler } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Location from 'expo-location';

const PermissionHandler = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== 'android') return;

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert(
            "Permiso de Ubicación Denegado",
            "RoutineQuest necesita acceso a la ubicación para validar los retos basados en ubicación.",
            [
              { 
                text: "Reintentar", 
                onPress: () => requestPermissions() 
              },
              { 
                text: "Abrir Ajustes", 
                onPress: () => {
                  BackHandler.exitApp();
                }
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

        // Verificar conexión a internet
        const networkState = await NetInfo.fetch();
        if (!networkState.isConnected) {
          Alert.alert(
            "Error de Conexión",
            "No hay conexión a Internet. La aplicación necesita conexión para funcionar.",
            [
              { text: "Reintentar", onPress: () => requestPermissions() },
              { text: "Salir", onPress: () => BackHandler.exitApp(), style: 'cancel' }
            ],
            { cancelable: false }
          );
          return;
        }

      } catch (err) {
        console.warn('Error solicitando permisos:', err);
        Alert.alert(
          "Error de Permisos",
          "No se pudieron verificar los permisos necesarios.",
          [
            { text: "Reintentar", onPress: () => requestPermissions() }
          ]
        );
      }
    };

    requestPermissions();

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