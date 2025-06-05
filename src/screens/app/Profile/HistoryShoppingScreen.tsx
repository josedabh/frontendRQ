import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../../../App';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import { HistoryShopping } from '../../../shared/models/StoreData';
import { getListHistoryRewardsUser } from '../../../shared/services/StoreService';
import colors from '../../../shared/themes/constants/colors';
import textStyles from '../../../shared/themes/styles/textStyles';

type NavProps = BottomTabNavigationProp<RootStackParamList, 'HistoryShopping'>;

export default function HistoryShoppingScreen() {
    const [purchases, setPurchases] = useState<HistoryShopping[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigation = useNavigation<NavProps>();

    useEffect(() => {
        const loadPurchases = async () => {
            try {
                const data = await getListHistoryRewardsUser();
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
        <View style={styles.card}>
            {/* Reward Information */}
            <View style={styles.section}>
                <Text style={[textStyles.subtitle, styles.rewardName]}>{item.rewardName}</Text>
                <Text style={styles.description}>{item.rewardDescription}</Text>
                <Text style={styles.points}>{item.rewardPoints} pts</Text>
            </View>

            {/* User Information */}
            <View style={styles.section}>
                <View style={styles.userHeader}>
                    <Text style={styles.userName}>
                        {item.userName} {item.userLastname}
                    </Text>
                    <Text style={styles.userNick}>@{item.userApodo}</Text>
                </View>
                <Text style={styles.userInfo}>Tel: {item.userNumPhone}</Text>
                <Text style={styles.userInfo}>Puntos disponibles: {item.userPoints}</Text>
            </View>

            {/* Transaction Date */}
            <View style={styles.footer}>
                <Text style={styles.date}>
                    Comprado el: {new Date(item.transactionPurchaseDate).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader
                title="Historial de Compras"
                onLeftPress={() => navigation.goBack()}
                leftLabel="← Volver"
            />
            <FlatList
                data={purchases}
                renderItem={renderItem}
                keyExtractor={(item) => item.transactionId.toString()}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay compras registradas</Text>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundLight,
    },
    list: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    section: {
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.backgroundLight,
    },
    rewardName: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    points: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.textPrimary,
        marginRight: 8,
    },
    userNick: {
        fontSize: 14,
        color: colors.primary,
        fontStyle: 'italic',
    },
    userInfo: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 2,
    },
    footer: {
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: colors.textSecondary,
        fontStyle: 'italic',
    },
    separator: {
        height: 12,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundLight,
    },
    errorText: {
        color: colors.danger,
        fontSize: 16,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: colors.textSecondary,
        fontSize: 16,
    },
});
