import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { RootStackParamList } from "../../../App";
import { MyButton } from "../../components/shared/MyButton";
import colors from "../../shared/themes/constants/colors";

export default function ManageUsersScreen() {
  const navigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList, "ManageUsers">>();
  return (
    <SafeAreaView>
      <Text>Hola ManageUsersScreen</Text>
      <MyButton
        title="Volver"
        style={styles.btnCancel}
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnCancel: {
    backgroundColor: colors.danger,
  },
});
