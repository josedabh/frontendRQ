import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import colors from '../../shared/themes/constants/colors';

interface HeaderNavigationProps {
    onPress?: () => void;
}
/** Componente que va arriba del screen para ir para atras */
//Opcion a cambiar estilos
export default function HeaderNavigation({onPress}: HeaderNavigationProps) {
    return (
        <View style={styles.header}>
            <View style={styles.headerActions}>
                <TouchableOpacity
                    onPress={ onPress }
                    style={styles.headerAction}>
                    <FeatherIcon
                        color= {colors.backgroundLight}
                        name="arrow-left"
                        size={24} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.backgroundDark
    },
    headerAction: {
        width: 40,
        height: 40,
        // borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: colors.backgroundLight,
        marginBottom: 16,
    },
});