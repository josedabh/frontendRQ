import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import colors from '../../themes/constants/colors';

const HeaderNavigation = () => {
    return (
        <View style={styles.header}>
            <View style={styles.headerActions}>
                <TouchableOpacity
                    onPress={() => {
                        // handle onPress
                    }}
                    style={styles.headerAction}>
                    <FeatherIcon
                        color="#F82E08"
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
        backgroundColor: colors.shadow
    },
    headerAction: {
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.backgroundLight,
        marginBottom: 16,
    },
});