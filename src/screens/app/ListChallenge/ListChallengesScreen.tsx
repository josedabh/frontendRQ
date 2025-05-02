import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../../App';
import Card from '../../../components/shared/Card/Card';
import MySearchbar from '../../../components/shared/MySearchBar/MySearchBar';
import { ChallengeCard } from '../../../shared/models/ChallengeData';
import { getUserChallengeCard } from '../../../shared/services/ChallengeService';
import textStyles from '../../../shared/themes/styles/textStyles';

export default function ListChallengesScreen() {
    const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList, 'ListChallenge'>>();
    const [cardChallenge, setCardChallenge] = useState<ChallengeCard[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const fetchListChallenge = async () => {
            try {
                const listChallenge = await getUserChallengeCard();
                setCardChallenge(listChallenge);
            } catch (error) {
                console.log(error)
            }
        };
        fetchListChallenge();
    }, []);

    // Filtro de retos por título
    const filteredChallenges = useMemo(() => {
        const query = input.toLowerCase();
        return cardChallenge.filter(ch => ch.title.toLowerCase().includes(query));
    }, [input, cardChallenge]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={textStyles.title}> Retos </Text>
                <MySearchbar title="Buscar reto" value={input} onChangeText={setInput} />
                <ScrollView contentContainerStyle={styles.horizontalScroll}>
                    {filteredChallenges.map((ch, index) => (
                        <Card
                            key={index}
                            title={ch.title}
                            desc={ch.description}
                            onPress={() => navigation.navigate("Challenge", { id: ch.id })}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    horizontalScroll: {
        paddingLeft: 24,
        paddingBottom: 10,
    },
});