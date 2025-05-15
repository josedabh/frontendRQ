import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '../../components/shared/Card';
import { getListProducts } from '../../shared/services/StoreService';
import textStyles from '../../shared/themes/styles/textStyles';
import { RewardResponse } from '../../shared/models/StoreData';

/** Cambiar para la url */
export default function StoreScreen() {
    const [rewardList, setRewardList] = useState<RewardResponse[]>([
        {
            id: 0,
            name: '',
            description: '',
            points: 0,
            image: '',
            active: false,
            stock: 0,
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getListProducts();
                setRewardList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <SafeAreaView style={{ padding: 16 }}>
            <View style={{ flex: 1, padding: 16 }}>
                <Text style={textStyles.title}>Tienda</Text>
                <ScrollView contentContainerStyle = {styles.horizontalScroll}>
                    {rewardList.map((item) => (
                        <Card
                            key = { item.id }
                            title = { item.name }
                            desc = { Number.parseInt(item.points) + ' puntos' }
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