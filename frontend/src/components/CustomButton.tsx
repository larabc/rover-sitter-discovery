import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { colors, spacing, borderRadius, textSizes } from '../constants/theme';
interface CustomButtonProps {
    label?: string,
    Icon?: React.ComponentType<{ color?: string, size?: number }>
    onPressFn: () => void,
    accesibilityLabel: string,
    variant?: 'outlined' | 'filled',
    disabled?: boolean,
}

export default function CustomButton({ label, Icon, onPressFn, accesibilityLabel, variant = 'outlined', disabled = false }: CustomButtonProps) {
    const isFilled = variant === 'filled'

    return (
        <Pressable onPress={onPressFn} style={[styles.button, isFilled && styles.filledButton, disabled && styles.disabledButton]} accessibilityLabel={accesibilityLabel} disabled={disabled}>
            {Icon && <Icon color={isFilled ? colors.white : colors.primary} />}
            {label && <Text style={[styles.text, isFilled && styles.filledText]}>{label}</Text>}
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
    filledButton: {
        backgroundColor: colors.accent,
        borderColor: colors.accent,
    },
    text: {
        color: colors.primary,
        fontSize: textSizes.paragraph,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    filledText: {
        color: colors.white,
    },
    disabledButton: {
        backgroundColor: colors.border,
        borderColor: colors.border,
    },
    disabledText: {
        color: colors.disabled,
    },
});