import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import AnswerOption from '../../../components/layout/challenges/AnswerOption';
import { Theme } from '../../../shared/themes/themes';
import { useTheme } from '../../../context/ThemeContext';

const answers = [
  { id: "a", label: "Comida" },
  { id: "b", label: "Letras" },
  { id: "c", label: "Coche" },
];

export default function ValidationQuestScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView style = { { flex: 1, backgroundColor: "#fff" } }>
      <View style = { styles.card }>
        <Text style = { styles.title }>¿Qué hay en un libro?</Text>
      </View>

      <View style = { styles.card }>
        { answers.map((ans, index) => (
          <AnswerOption
            key = { ans.id }
            id = { ans.id }
            label = { ans.label }
            isActive = { selected === ans.id }
            isFirst = { index === 0 }
            isLast = { index === answers.length - 1 }
            onPress = { () => setSelected(ans.id) }
          />
        )) }
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.textTitle,
    marginBottom: 12,
  },
});
