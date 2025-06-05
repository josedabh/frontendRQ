import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { getListHistoryRewardsUser } from '../../../shared/services/StoreService';
import { HistoryShopping } from '../../../shared/models/StoreData';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';

export default function PurchaseHistoryScreen() {
    const [purchases, setPurchases] = useState<HistoryShopping[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigation = useNavigation();
    useEffect(() => {
        const loadPurchases = async () => {
            try {
                const data = await getListHistoryRewardsUser(); // Call the API to fetch purchase history
                setPurchases(data);
            } catch (err) {
                setError('Error al cargar el historial de compras.');
            } finally {
                setLoading(false);
            }
        };

        loadPurchases();
    }, []);

    const renderItem = ({ item }: { item: HistoryShopping }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.transactionId}</Text>
            <Text style={styles.cell}>{item.userName} {item.userLastname}</Text>
            <Text style={styles.cell}>{item.rewardName}</Text>
            <Text style={styles.cell}>{item.transactionPurchaseDate}</Text>
            <Text style={styles.cell}>{item.rewardPoints}</Text>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <ScreenHeader
                title="Historial de Compras"
                onLeftPress={() => navigation.goBack()}
                leftLabel="← Volver"
            />
            {/** Tabla historial */}
            <FlatList
                data={purchases}
                renderItem={renderItem}
                keyExtractor={(item) => item.transactionId.toString()}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    list: {
        paddingBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
        textAlign: 'left',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
