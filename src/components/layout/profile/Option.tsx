import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../shared/themes/themes";
import createTextStyles from "../../../shared/themes/styles/textStyles";

interface OptionProps {
  title: string;
  onPress?: () => void;
}

const Option: React.FC<OptionProps> = ({ title, onPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const textStyles = createTextStyles(theme);

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{title}</Text>
          </View>

          <View style={styles.cardAction}>
            <FeatherIcon
              color={theme.success}
              name="chevron-right"
              size={22}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: theme.border,
  },
  card: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardBody: {
    marginRight: "auto",
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.textTitle,
  },
  cardAction: {
    paddingRight: 16,
  },
});

export default Option;
