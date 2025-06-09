import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AnswerOptionProps {
  id: string;
  label: string;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  onPress: () => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  id,
  label,
  isActive,
  isFirst,
  isLast,
  onPress,
}) => {
  return (
    <View
      style={[
        styles.radioWrapper,
        isActive && styles.radioActive,
        isFirst && styles.radioFirst,
        isLast && styles.radioLast,
      ]}
    >
      <TouchableOpacity onPress={onPress} style={styles.radio}>
        <View
          style={[styles.radioInput, isActive && styles.radioInputActive]}
        />
        <Text style={styles.radioLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  radioWrapper: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7e5",
    marginTop: -2,
  },
  radioActive: {
    backgroundColor: "#f1f4ff",
  },
  radioFirst: {
    marginTop: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  radioLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  radio: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  radioInput: {
    width: 16,
    height: 16,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#b0b0b0",
    marginRight: 12,
  },
  radioInputActive: {
    borderWidth: 5,
    borderColor: "#1d1d1d",
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d1d1d",
  },
});

export default AnswerOption;
