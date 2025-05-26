import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../../../App';
import CardChallenge from '../../../components/layout/challenges/CardChallenge';
import MySearchbar from '../../../components/shared/MySearchBar';
import { ChallengeResponse } from '../../../shared/models/ChallengeData';
import { getAllChallenges } from '../../../shared/services/ChallengeService';
import textStyles from '../../../shared/themes/styles/textStyles';

export default function ListChallengesScreen() {
    const navigation =
        useNavigation<
            BottomTabNavigationProp<RootStackParamList, 'Layout'>
        >();
    const [cardChallenge, setCardChallenge] = useState<ChallengeResponse[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetchListChallenge = async () => {
            try {
                const listChallenge = await getAllChallenges();
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

    const renderItem = ({ item }: { item: ChallengeResponse }) => (
        <CardChallenge
            title={item.title}
            description={item.description}
            difficulty={item.difficulty}
            points={item.points}
            onPress={() => navigation.navigate('Challenge', { id: item.id })}
        />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={textStyles.title}>Retos</Text>
                {/** Barra de busqueda */}
                <MySearchbar
                    title="Buscar reto"
                    value={input}
                    onChangeText={setInput}
                />

                {/** Lista de retos */}
                <FlatList
                    data={filteredChallenges}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text style={styles.empty}>No hay retos</Text>}
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
        textAlign: "center",
        marginTop: 40,
        color: "#888",
        fontSize: 16,
    },
    separator: {
        height: 12,
    },
});
