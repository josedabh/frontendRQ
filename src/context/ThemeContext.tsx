import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { bermellon, futurista, naturaleza, oscuro, retro, Theme } from '../shared/themes/themes';

type ThemeKey = 'bermellon' | 'futurista' | 'naturaleza' | 'oscuro' | 'retro';

interface ThemeContextValue {
  theme: Theme;
  setThemeKey: (key: ThemeKey) => void;
  themeKey: ThemeKey;
}

const defaultKey: ThemeKey = 'bermellon';

const ThemeContext = createContext<ThemeContextValue>({
  theme: bermellon,
  setThemeKey: () => {},
  themeKey: defaultKey,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeKey, setThemeKeyState] = useState<ThemeKey>(defaultKey);
  const [theme, setTheme] = useState<Theme>(bermellon);

  useEffect(() => {
    // Al arrancar, cargamos tema guardado
    (async () => {
      const saved = await AsyncStorage.getItem('APP_THEME') as ThemeKey | null;
      if (saved) {
        setThemeKeyState(saved);
        setTheme(getThemeByKey(saved));
      }
    })();
  }, []);

  const getThemeByKey = (key: ThemeKey): Theme => {
    switch (key) {
      case 'futurista':
        return futurista;
      case 'naturaleza':
        return naturaleza;
      case 'oscuro':
        return oscuro;
      case 'retro':
        return retro;
      default:
        return bermellon;
    }
  };

  const setThemeKey = async (key: ThemeKey) => {
    setThemeKeyState(key);
    setTheme(getThemeByKey(key));
    await AsyncStorage.setItem('APP_THEME', key);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeKey, themeKey }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook de acceso
export const useTheme = () => useContext(ThemeContext);
