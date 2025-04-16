import { Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import textStyles from "../../themes/styles/textStyles";
import { View } from "react-native";
import globalStyles from "../../themes/styles/globalStyles";
import colors from "../../themes/constants/colors";
import { MyButton } from "../../components/shared/MyButton/MyButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import Option from "../../components/features/profile/Option";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Perfil">;

/**Ajustes del usuarios Nombre a cambiar */
export default function ProfileScreen( { navigation }: ProfileScreenProps) {
    return (
        <SafeAreaView style = {{ padding: 16}}>
            <View style = { globalStyles.card }>
                <Image 
                    source = {require('../../../assets/Brad-Pitt.jpg')}
                    style = { styles.pruebaImage } 
                />
                <Text 
                    style = { textStyles.title }
                > Brad Pitt 
                </Text>
            </View>
            <View style = { globalStyles.card }>
                <Option title = 'Información de usuario' onPress = {() => navigation.navigate('Datauser')}/>
                <Option title = "Historial de retos cumplidos" />
                <Option title = "Historial de Recompensas" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pruebaImage : {
        width: 200,
        height: 200,
        borderWidth: 3.5,
        borderColor: colors.backgroundDark,
        borderRadius: 100,
        //Centra la imagen
        alignSelf: 'center',
        //La imagen se corta para que quepa la imagen
        resizeMode: "cover",
    }
})