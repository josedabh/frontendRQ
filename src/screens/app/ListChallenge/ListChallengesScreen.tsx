import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../../../App';
import CardChallenge from '../../../components/layout/challenges/CardChallenge';
import MySearchbar from '../../../components/shared/MySearchBar';
import { useTheme } from '../../../context/ThemeContext';
import { ChallengeResponse } from '../../../shared/models/ChallengeData';
import { listChallengesForUser } from '../../../shared/services/ChallengeService';
import createTextStyles from '../../../shared/themes/styles/textStyles';
import { Theme } from '../../../shared/themes/themes';

export default function ListChallengesScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const textStyles = createTextStyles(theme);
    const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList, 'Layout'>>();
    
    const [cardChallenge, setCardChallenge] = useState<ChallengeResponse[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetchListChallenge = async () => {
            try {
                // Using listChallengesForUser instead of getAllChallenges
                const listChallenge = await listChallengesForUser();
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
        <View style={styles.challengeContainer}>
            <CardChallenge
                title={item.title}
                description={item.description}
                difficulty={item.difficulty}
                points={item.points}
                state={item.state} // Añadido estado
                onPress={() => navigation.navigate('Challenge', { id: item.id })}
            />
        </View>
    );

    return (
        <SafeAreaView style= {styles.container}>
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

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        paddingBottom: 55,
    },
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
        color: theme.empty,
        fontSize: 16,
    },
    separator: {
        height: 12,
    },
    challengeContainer: {
        marginBottom: 12,
    },
});
