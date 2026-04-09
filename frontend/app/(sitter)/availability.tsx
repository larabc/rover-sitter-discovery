import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from '../../src/components/CustomButton';
import { router } from 'expo-router';
import { layoutStyles, spacing } from '../../src/constants/theme';
import Header from '../../src/components/Header';

export default function Availability() {
    return (
        <View style={layoutStyles.generalContainer}>
            <Header label='My Availability' />
            <View style={styles.container}>
                <CustomButton label="Weekly availability" variant="filled" onPressFn={() => router.push('/(sitter)/weekly_availability')} accesibilityLabel='Button that goes to sitter weekly availaibilty page' />
                <CustomButton label="Change a date's availability" variant="outlined" onPressFn={() => router.push('/(sitter)/adjusted_availability')} accesibilityLabel='Button that goes to sitter adjusted availaibilty page' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: spacing.lg,
        gap: spacing.md,
    },
});