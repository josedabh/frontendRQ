import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../../App';
import MySearchBar from '../../../components/shared/MySearchBar';
import { useTheme } from '../../../context/ThemeContext';
import { RewardResponse } from '../../../shared/models/StoreData';
import { getListRewardsUsers } from '../../../shared/services/StoreService';
import colors from '../../../shared/themes/constants/colors';
import createTextStyles from '../../../shared/themes/styles/textStyles';

/** Pantalla de lista de productos */
export default function ListStoreScreen() {
    const { theme } = useTheme();
    const textStyles = createTextStyles(theme);

    const navigation =
        useNavigation<BottomTabNavigationProp<RootStackParamList, "Layout">>();
    const [input, setInput] = useState("");
    const [rewardList, setRewardList] = useState<RewardResponse[]>([
        
    ]);

    // Filtro de retos por título
    const filteredRewards = useMemo(() => {
        const query = input.toLowerCase();
        return rewardList.filter((ch) => ch.name.toLowerCase().includes(query));
    }, [input, rewardList]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getListRewardsUsers();
                setRewardList(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const renderItem = ({ item }: { item: RewardResponse }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Store', { id: item.id })}
        >
            <Text style={styles.cardTitle} numberOfLines={1}>
                {item.name}
            </Text>
            <Text style={styles.cardDesc} numberOfLines={2}>
                {item.description}
            </Text>
            <View style={styles.cardFooter}>
                <Text style={styles.points}>{item.points} pt{item.points !== 1 ? 's' : ''}</Text>
                <Text style={[styles.stock, item.stock === 0 && styles.outOfStock]}>
                    {item.stock > 0 ? `Stock: ${item.stock}` : 'Agotado'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ padding: 16 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={textStyles.title}>Tienda</Text>
                <MySearchBar
                    title="Buscar Recompensa"
                    value={input}
                    onChangeText={setInput}
                />
                <FlatList
                    data={filteredRewards}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListEmptyComponent={<Text style={styles.empty}>No hay recompensas</Text>}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    horizontalScroll: {
        paddingLeft: 24,
        paddingBottom: 10,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 75,
    },
    separator: {
        height: 12,
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#888",
        fontSize: 16,
    }, 
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    points: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary,
    },
    stock: {
        fontSize: 12,
        color: '#555',
    },
    outOfStock: {
        color: colors.danger,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        elevation: 2,
        boxShadow: colors.backgroundDark,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
        resizeMode: 'cover',
    },
});
