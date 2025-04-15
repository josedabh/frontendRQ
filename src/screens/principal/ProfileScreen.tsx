import { Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyles from "../../themes/styles/textStyles";
import { View } from "react-native";
import globalStyles from "../../themes/styles/globalStyles";
import colors from "../../themes/constants/colors";
import { MyButton } from "../../components/shared/MyButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Perfil">;

/**Ajustes del usuarios Nombre a cambiar */
export default function ProfileScreen( { navigation }: ProfileScreenProps) {
    return (
        <SafeAreaView style = {{ padding: 16}}>
            <View style = { globalStyles.card }>
                <Image 
                    source = {require('../../../assets/Brad-Pitt.jpg')}
                    style = { [styles.pruebaImage, { borderRadius: 20 } , { resizeMode: "cover" }] } 
                />
                <Text 
                    style = { textStyles.title }
                > Brad Pitt 
                </Text>
            </View>
            <View style = { globalStyles.card }>
                <MyButton title = 'Información de usuario' onPress = {() => navigation.navigate('Datauser')}/>
                <Text> Historial de retos cumplidos </Text>
                <Text> Historial de Recompensas </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pruebaImage : {
        width: 200,
        height: 200,
        borderWidth: 5,
        borderColor: colors.primary,
        // alignContent: "center",
        // justifyContent: "center",
        // alignItems: "center"
    }
})