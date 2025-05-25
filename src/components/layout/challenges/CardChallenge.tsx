import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../../../shared/themes/constants/colors';

export interface ChallengeCardProps {
  title: string;
  description: string;
  difficulty: string;
  points: number;
  onPress?: () => void;
}

export default function CardChallenge({
  title,
  description,
  difficulty,
  points,
  onPress,
}: ChallengeCardProps) {

  // Colorea la etiqueta según dificultad
  const diffColor =
    difficulty === 'easy'
      ? colors.success
      : difficulty === 'medium'
      ? colors.warning
      : colors.danger;

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
          <Text style={styles.badgeText}>{difficulty.toUpperCase()}</Text>
        </View>
        <Text style={styles.points}>{points} pt{points !== 1 ? 's' : ''}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    // Sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevación Android
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  desc: {
    fontSize: 14,
    color: '#666',
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
    color: '#fff',
  },
  points: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
