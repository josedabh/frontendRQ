import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface NetworkContextData {
    isConnected: boolean;
}

const NetworkContext = createContext<NetworkContextData>({ isConnected: true });

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <NetworkContext.Provider value={{ isConnected }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetwork = () => useContext(NetworkContext);