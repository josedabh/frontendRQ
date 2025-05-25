import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import MySearchBar from '../../../components/shared/MySearchBar';
import { AdminStackParamList } from '../AdminStackScreen';
import { HistoryShopping } from '../../../shared/models/StoreData';
import { getListHistoryRewards } from '../../../shared/services/StoreService';
import colors from '../../../shared/themes/constants/colors';

export default function HistoryRewardsScreen() {
    const navigation = useNavigation<BottomTabNavigationProp<AdminStackParamList, "HistoryRewards">>();
    const [input, setInput] = useState("");
    const [historyRewards, setHistoryRewards] = useState<HistoryShopping[]>([]);

    // Filtro de retos por título
    const filteredHisRew = useMemo(() => {
        const query = input.toLowerCase();
        return historyRewards.filter((hisRew) => hisRew.userName.toLowerCase().includes(query));
    }, [input, historyRewards]);

    const [loading, setLoading] = useState(true);

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
        <TouchableOpacity
            style={styles.row}
            onPress={() => {
                /* navegar a detalle si lo deseas */
            }}
        >
            <Text style={[styles.cell, styles.id]}>{item.transactionId}</Text>
            <Text style={[styles.cell, styles.user]} numberOfLines={1}>
                {item.userName} {item.userLastname}
            </Text>
            <Text style={[styles.cell, styles.reward]} numberOfLines={1}>
                {item.rewardName}
            </Text>
            <Text style={[styles.cell, styles.date]}>
                {new Date(item.transactionPurchaseDate).toLocaleDateString()}
            </Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>

            {/* Header personalizado */}
            <ScreenHeader
                title="Administrar Retos"
                onLeftPress={() => navigation.navigate('AdminHome')}
                leftLabel="← Volver"
            />
            {/* Barra de búsqueda */}
            <MySearchBar
                title="Buscar nombre del usuario"
                value={input}
                onChangeText={setInput}
            />

            {/* Header row */}
            <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.cell, styles.id, styles.headerText]}>#</Text>
                <Text style={[styles.cell, styles.user, styles.headerText]}>Usuario</Text>
                <Text style={[styles.cell, styles.reward, styles.headerText]}>Recompensa</Text>
                <Text style={[styles.cell, styles.date, styles.headerText]}>Fecha</Text>
            </View>
            <FlatList
                data={historyRewards}
                keyExtractor={(item) => item.transactionId.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f8fa",
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    headerRow: {
        backgroundColor: colors.backgroundLight
    },
    cell: {
        fontSize: 14,
        color: '#333'
    },
    headerText: {
        fontWeight: '700',
        color: colors.primary
    },
    id: {
        flex: 1
    },
    user: {
        flex: 3,
        paddingHorizontal: 8
    },
    reward: {
        flex: 3,
        paddingHorizontal: 8
    },
    date: {
        flex: 2,
        textAlign: 'right'
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginHorizontal: 16
    },
});