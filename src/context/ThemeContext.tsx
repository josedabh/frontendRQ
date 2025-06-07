import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { bermellon, futurista, Theme } from '../shared/themes/themes';

type ThemeKey = 'bermellon' | 'futurista';

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
      const saved = await AsyncStorage.getItem('APP_THEME');
      if (saved === 'futurista' || saved === 'bermellon') {
        setThemeKeyState(saved);
        setTheme(saved === 'futurista' ? futurista : bermellon);
      }
    })();
  }, []);

  const setThemeKey = async (key: ThemeKey) => {
    setThemeKeyState(key);
    setTheme(key === 'futurista' ? futurista : bermellon);
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
