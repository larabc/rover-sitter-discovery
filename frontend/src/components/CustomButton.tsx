import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { colors, spacing, borderRadius, textSizes } from '../constants/theme';

interface CustomButtonProps {
    label?: string,
    Icon?: React.ComponentType<{ color?: string, size?: number }>
    onPressFn: () => void,
    accesibilityLabel: string,
}

export default function CustomButton({ label, Icon, onPressFn, accesibilityLabel, }: CustomButtonProps) {

    return (
        <Pressable onPress={onPressFn} style={styles.button} accessibilityLabel={accesibilityLabel}>
            {Icon && <Icon color={colors.primary} />}
            {label && <Text style={styles.text}>{label}</Text>}
        </Pressable>
    )
}


const styles = StyleSheet.create({
    button: {
        padding: spacing.sm,
        borderRadius: borderRadius.pill,
        borderColor: colors.border,
        borderWidth: 3,
    },
    text: {
        color: colors.primary,
        fontSize: textSizes.paragraph,
        textAlign: 'center',
        fontWeight: 'bold',
    }
});