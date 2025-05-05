import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import colors from '../../shared/themes/constants/colors';

interface SearchProps {
    title: string;
    value: string;
    onChangeText: (text: string) => void;
}

const MySearchBar: React.FC<SearchProps> = ({ title, value, onChangeText }) => {
    return (
        <View style={styles.searchWrapper}>
            <View style={styles.search}>
                <View style={styles.searchIcon}>
                    <FeatherIcon color="#848484" name="search" size={17} />
                </View>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    placeholder={title}
                    placeholderTextColor={colors.shadow}
                    onChangeText={onChangeText}
                    returnKeyType="done"
                    value={value}
                    style={styles.searchControl}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchWrapper: {
        paddingTop: 8,
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#efefef',
    },
    search: {
        position: 'relative',
        backgroundColor: '#efefef',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    searchIcon: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 34,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    searchControl: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        paddingLeft: 34,
        width: '100%',
        fontSize: 16,
        fontWeight: '500',
    },
})

export default MySearchBar;