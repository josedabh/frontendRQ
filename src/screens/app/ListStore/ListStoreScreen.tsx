import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../../../../App';
import Card from '../../../components/shared/Card';
import { RewardResponse } from '../../../shared/models/StoreData';
import { getListProducts } from '../../../shared/services/StoreService';
import textStyles from '../../../shared/themes/styles/textStyles';

/** Pantalla de lista de productos */
export default function ListStoreScreen() {
    const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList, 'ListStore'>>();
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
                            desc = { item.description }
                            onPress={() => navigation.navigate("Store", { id: item.id })}
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