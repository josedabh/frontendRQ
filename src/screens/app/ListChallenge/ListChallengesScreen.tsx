import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../../../App';
import CardChallenge from '../../../components/layout/challenges/CardChallenge';
import MySearchbar from '../../../components/shared/MySearchBar';
import { ChallengeCard } from '../../../shared/models/ChallengeData';
import { getUserChallengeCard } from '../../../shared/services/ChallengeService';
import textStyles from '../../../shared/themes/styles/textStyles';

export default function ListChallengesScreen() {
    const navigation =
        useNavigation<
            BottomTabNavigationProp<RootStackParamList, 'Layout'>
        >();
    const [cardChallenge, setCardChallenge] = useState<ChallengeCard[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetchListChallenge = async () => {
            try {
                const listChallenge = await getUserChallengeCard();
                setCardChallenge(listChallenge);
            } catch (error) {
                console.log(error);
            }
        };
        fetchListChallenge();
    }, []);

    // Filtro de retos por título
    const filteredChallenges = useMemo(() => {
        const query = input.toLowerCase();
        return cardChallenge.filter((ch) => ch.title.toLowerCase().includes(query));
    }, [input, cardChallenge]);

    const renderItem = ({ item }: { item: ChallengeCard }) => (
        <CardChallenge
            title={item.title}
            description={item.description}
            difficulty="easy"
            points={1}
            onPress={() => navigation.navigate('Challenge', { id: item.id })}
        />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={textStyles.title}>Retos</Text>
                <MySearchbar
                    title="Buscar reto"
                    value={input}
                    onChangeText={setInput}
                />

                <FlatList
                    data={filteredChallenges}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<View style={styles.empty} />}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingLeft: 16,
        paddingBottom: 80,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    empty: {
        height: 200, // espacio cuando no hay resultados
    },
    separator: {
        height: 12,
    },
});
