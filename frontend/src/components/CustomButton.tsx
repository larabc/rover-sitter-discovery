import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { colors, spacing, borderRadius, textSizes } from '../constants/theme';

interface CustomButtonProps {
    label: string,
    onPressFn: () => void,
    accesibilityLabel: string,
}

export default function CustomButton({ label, onPressFn, accesibilityLabel }: CustomButtonProps) {

    return (
        <Pressable onPress={onPressFn} style={styles.button} accessibilityLabel={accesibilityLabel}>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    button: {
        padding: spacing.md,
        borderRadius: borderRadius.pill,
        borderColor: colors.border,
        borderWidth: 3,
        height: 48,
    },
    text: {
        color: colors.primary,
        fontSize: textSizes.paragraph,
        textAlign: 'center',
        fontWeight: 'bold',
    }
});