import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../../../context/ThemeContext';
import { getDifficultyLabel } from '../../../shared/models/ChallengeData';
import { Theme } from '../../../shared/themes/themes';
import { getStateLabel } from '../../../shared/utils/Utils';

export interface ChallengeCardProps {
  title: string;
  description: string;
  difficulty: string;
  points: number;
  state: string; // Añadido estado
  onPress?: () => void;
}

export default function CardChallenge({
  title,
  description,
  difficulty,
  points,
  state, // Añadido estado
  onPress,
}: ChallengeCardProps) {
  // Acceso al tema y estilos personalizados
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Colorea la etiqueta según dificultad
  const diffColor =
    difficulty.toLowerCase() === 'easy'
      ? theme.success
      : difficulty.toLowerCase() === 'medium'
      ? theme.warning
      : theme.error;

  return (
    <TouchableOpacity
      style={[styles.card]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.desc} numberOfLines={2}>
        {description}
      </Text>
      <View style={styles.footer}>
        <View style={[styles.badge, { backgroundColor: diffColor }]}>
          <Text style={styles.badgeText}>
            {getDifficultyLabel(difficulty)}
          </Text>
        </View>
        <View style={styles.rightFooter}>
          <Text style={styles.points}>{points} pt{points !== 1 ? 's' : ''}</Text>
          <Text style={[styles.stateText, getStateStyle(state, theme)]}>
            {getStateLabel(state)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getStateStyle = (state: string, theme: Theme) => {
  switch (state) {
    case 'CANCELLED':
      return { color: theme.error };
    case 'PENDING':
      return { color: theme.warning };
    case 'IN_PROGRESS':
      return { color: theme.primary };
    case 'FINISHED':
      return { color: theme.success };
    default:
      return {};
  }
};

const createStyles = (theme: Theme) => StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: theme.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: theme.textTitle,
  },
  desc: {
    fontSize: 14,
    color: theme.textSubtitle,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.buttonText,
  },
  points: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.primary,
  },
  rightFooter: {
    alignItems: 'flex-end',
  },
  stateText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
