import { Button, Text, View } from 'react-native';

import { useTheme } from '../../../context/ThemeContext';

export default function ThemeScreen() {
    const { setThemeKey, themeKey } = useTheme();

    return (
        <View style={{ padding: 16 }}>
            <Text>Selecciona un tema:</Text>
            <Button
                title="Bermellón"
                onPress={() => setThemeKey('bermellon')}
                color={themeKey === 'bermellon' ? 'grey' : undefined}
            />
            <Button
                title="Futurista"
                onPress={() => setThemeKey('futurista')}
                color={themeKey === 'futurista' ? 'grey' : undefined}
            />
        </View>
    );
}
