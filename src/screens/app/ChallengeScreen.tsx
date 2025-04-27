import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../../shared/themes/constants/colors';
import textStyles from '../../shared/themes/styles/textStyles';

export default function ChallengeScreen() {
    return (
        <SafeAreaView style = {{flex:1}}>
            
            {/**Donde empezaría la pag de retos */}
            <View style = { styles.placeholder }>
                <View style = { styles.placeholderInset }>
                    <Text style = { textStyles.title }>
                        Nombre Reto
                    </Text>
                    <Text style = { textStyles.normal }>
                        Description
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    placeholder: {
        // flexGrow: 1,
        // flexShrink: 1,
        // flexBasis: 0,
        flex: 1,
        height: 400,
        marginTop: 0,
        padding: 24,
        backgroundColor: 'transparent',
    },
    placeholderInset: {
        borderWidth: 4,
        borderColor: colors.danger,
        borderRadius: 12,
        // flexGrow: 1,
        // flexShrink: 1,
        // flexBasis: 0,
        flex:1
    },
});