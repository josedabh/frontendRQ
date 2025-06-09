import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../shared/themes/themes";

interface SearchProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
}

const MySearchBar: React.FC<SearchProps> = ({ title, value, onChangeText }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.searchWrapper}>
      <View style={styles.search}>
        <View style={styles.searchIcon}>
          <FeatherIcon color={theme.textMuted} name="search" size={17} />
        </View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          placeholder={title}
          placeholderTextColor={theme.textMuted}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={value}
          style={styles.searchControl}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    searchWrapper: {
      paddingTop: 8,
      paddingHorizontal: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderColor: theme.border,
    },
    search: {
      position: "relative",
      backgroundColor: theme.backgroundAlt,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    searchIcon: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 34,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
    searchControl: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      paddingLeft: 34,
      width: "100%",
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
    },
  });

export default MySearchBar;
