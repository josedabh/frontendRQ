import { Image, StyleSheet, Text, View } from 'react-native';

import colors from '../../../shared/themes/constants/colors';
import globalStyles from '../../../shared/themes/styles/globalStyles';
import textStyles from '../../../shared/themes/styles/textStyles';

interface AvatarProps {
    textAvatar?: string;
    imageAvatar?: string;
}

/**Componente que muestra la imagen de perfil del usuario */
export function Avatar({textAvatar, imageAvatar}: AvatarProps) {
    //Si no se pasa la imagen, se usa la imagen por defecto
    const imageSource = imageAvatar ? { uri: imageAvatar } : require('../../../../assets/Brad-Pitt.jpg');
    return (
        <View style = { globalStyles.card }>
            <Image 
                source = {imageSource}
                style = { styles.avatarImage } 
            />
            <Text 
                style = { textStyles.title }
            > 
                { textAvatar ? textAvatar : "Brad Pitt" } 
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarImage : {
        width: 200,
        height: 200,
        borderWidth: 3.5,
        borderColor: colors.backgroundDark,
        borderRadius: 100,
        //Centra la imagen
        alignSelf: 'center',
        //La imagen se corta para que quepa la imagen
        resizeMode: "cover",
    },
});