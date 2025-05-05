import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../../App';
import HeaderNavigation from '../../../components/shared/HeaderNavigation';
import { ChallengeResponse } from '../../../shared/models/ChallengeData';
import { getChallengeById } from '../../../shared/services/ChallengeService';
import colors from '../../../shared/themes/constants/colors';
import textStyles from '../../../shared/themes/styles/textStyles';
import { RootTabParamList } from '../../Layout';

type ChallengeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Challenge'>;
type ChallengeScreenRouteProp = RouteProp<RootStackParamList, 'Challenge'>;

export default function ChallengeScreen() {
    const route = useRoute<ChallengeScreenRouteProp>();

    const [challenge, setChallenge] = useState<ChallengeResponse>({
        id: "", description: "", difficulty: "", endDate: "",
        points: 0, startDate: "", state: "", title: ""
    });
    
    const navigation = useNavigation<ChallengeScreenNavigationProp>();
    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const reto = await getChallengeById(route.params.id);
                setChallenge(reto);
            } catch (error) {
                console.log(error)
            }
        };

        fetchChallenge();
    }, []);

    return (
        <SafeAreaView style = {{flex:1}}>
            <HeaderNavigation onPress={() => navigation.goBack()} />
            {/**Donde empezaría la pag de retos */}
            <View style = { styles.placeholder }>
                <View style = { styles.placeholderInset }>
                    <Text style = { textStyles.title }>
                        {challenge?.title}
                    </Text>
                    <Text style={textStyles.normal}>
                        {challenge?.description}
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