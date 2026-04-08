import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { ArrowLeft } from 'lucide-react-native'
import { router } from 'expo-router'
import { spacing, textStyles } from '../constants/theme'

interface HeaderProps {
    label: string,
    isBackButtonVisible?: boolean,
}

export default function Header({ label, isBackButtonVisible = true }: HeaderProps) {
    return (
        <View style={styles.header}>
            {isBackButtonVisible && <CustomButton Icon={ArrowLeft} onPressFn={() => router.back()} accesibilityLabel='Button for going back to home page' />}
            <Text style={textStyles.displayHeader}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        gap: spacing.md,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingBlock: spacing.lg
    }
});