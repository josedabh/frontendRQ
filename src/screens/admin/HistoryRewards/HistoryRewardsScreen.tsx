import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import MySearchBar from '../../../components/shared/MySearchBar';
import { useTheme } from '../../../context/ThemeContext';
import { HistoryShopping } from '../../../shared/models/StoreData';
import { getListHistoryRewards } from '../../../shared/services/StoreService';
import createTextStyles from '../../../shared/themes/styles/textStyles';
import { Theme } from '../../../shared/themes/themes';
import { AdminStackParamList } from '../AdminStackScreen';

export default function HistoryRewardsScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const textStyles = createTextStyles(theme);

    const navigation = useNavigation<BottomTabNavigationProp<AdminStackParamList, "HistoryRewards">>();
    const [input, setInput] = useState("");
    const [historyRewards, setHistoryRewards] = useState<HistoryShopping[]>([]);
    const [loading, setLoading] = useState(true);

    // Filtro mejorado de recompensas
    const filteredHisRew = useMemo(() => {
        const query = input.toLowerCase();
        return historyRewards.filter((hisRew) => 
            hisRew.userName.toLowerCase().includes(query) ||
            hisRew.rewardName.toLowerCase().includes(query)
        );
    }, [input, historyRewards]);

    useEffect(() => {
        async function fetch() {
            try {
                const res = await getListHistoryRewards();
                setHistoryRewards(res);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, []);

    const renderItem = ({ item }: { item: HistoryShopping }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Transacción #{item.transactionId}</Text>
                <Text style={styles.date}>
                    {new Date(item.transactionPurchaseDate).toLocaleDateString()}
                </Text>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Usuario</Text>
                    <Text style={styles.value}>{item.userName} {item.userLastname}</Text>
                    <Text style={styles.subValue}>@{item.userApodo}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Recompensa</Text>
                    <Text style={styles.value}>{item.rewardName}</Text>
                    <Text style={styles.points}>{item.rewardPoints} pts</Text>
                </View>
            </View>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color={theme.primary} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader
                title="Historial de Recompensas"
                onLeftPress={() => navigation.navigate('AdminHome')}
                leftLabel="← Volver"
            />
            <MySearchBar
                title="Buscar por usuario o recompensa"
                value={input}
                onChangeText={setInput}
            />
            <FlatList
                data={filteredHisRew}
                keyExtractor={(item) => item.transactionId.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay registros que coincidan</Text>
                }
            />
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        paddingBottom: 55, // Espacio para evitar que el teclado cubra la lista
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: theme.card,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: theme.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.textTitle,
    },
    date: {
        fontSize: 14,
        color: theme.textMuted,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: theme.textMuted,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: theme.text,
        fontWeight: '500',
    },
    subValue: {
        fontSize: 14,
        color: theme.textMuted,
        marginTop: 2,
    },
    points: {
        fontSize: 14,
        color: theme.primary,
        fontWeight: '600',
        marginTop: 4,
    },
    separator: {
        height: 12,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: theme.empty,
        fontSize: 16,
    },
});