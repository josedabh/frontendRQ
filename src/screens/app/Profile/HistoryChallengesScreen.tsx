import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../../../../App';
import ScreenHeader from '../../../components/layout/admin/ScreenHeader';
import { useTheme } from '../../../context/ThemeContext';
import { ChallengeHistoryResponse } from '../../../shared/models/ChallengeData';
import { getCompletedChallengesHistory } from '../../../shared/services/ChallengeService';
import { Theme } from '../../../shared/themes/themes';
import createTextStyles from '../../../shared/themes/styles/textStyles';

type NavProps = BottomTabNavigationProp<RootStackParamList, 'HistoryChallenges'>;

export default function HistoryChallengesScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const textStyles = createTextStyles(theme);
    
    const [challenges, setChallenges] = useState<ChallengeHistoryResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigation = useNavigation<NavProps>();

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const data = await getCompletedChallengesHistory();
                setChallenges(data);
            } catch (err) {
                setError('Error al cargar el historial de retos.');
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, []);

    const renderItem = ({ item }: { item: ChallengeHistoryResponse }) => (
        <View style={styles.card}>
            <View style={styles.section}>
                <Text style={[textStyles.subtitle, styles.challengeTitle]}>
                    {item.challengeTitle}
                </Text>
                <Text style={styles.points}>{item.earnedPoints} pts</Text>
            </View>

            <View style={styles.section}>
                <View style={styles.userHeader}>
                    <Text style={styles.userName}>
                        {item.userName} {item.userLastname}
                    </Text>
                    <Text style={styles.userNick}>@{item.userUsername}</Text>
                </View>
                <Text style={styles.attempts}>Intentos: {item.attempts}</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.date}>
                    Completado el: {new Date(item.completedAt).toLocaleString('es-ES', {
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
                <ActivityIndicator size="large" color={theme.primary} />
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
                title="Historial de Retos"
                onLeftPress={() => navigation.goBack()}
                leftLabel="← Volver"
            />
            <FlatList
                data={challenges}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.challengeTitle}-${index}`}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay retos completados</Text>
                }
            />
        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    list: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 80,
    },
    card: {
        backgroundColor: theme.card,
        borderRadius: 12,
        padding: 16,
        shadowColor: theme.shadowColor,
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    section: {
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    challengeTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.text,
        marginBottom: 4,
    },
    points: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.primary,
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.text,
        marginRight: 8,
    },
    userNick: {
        fontSize: 14,
        color: theme.primary,
        fontStyle: 'italic',
    },
    attempts: {
        fontSize: 14,
        color: theme.secondary,
        marginTop: 4,
    },
    footer: {
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: theme.secondary,
        fontStyle: 'italic',
    },
    separator: {
        height: 12,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.backgroundAlt,
    },
    errorText: {
        color: theme.error,
        fontSize: 16,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: theme.empty,
        fontSize: 16,
    },
});