import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors, spacing, textSizes, textStyles } from '../constants/theme'
import { Sitter } from '../types/sitter'


interface SitterCardProps {
    sitter: Sitter
}

export default function SitterCard({ sitter }: SitterCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.circle} />
            <View style={styles.info}>
                <Text style={textStyles.sectionHeader}>{sitter.name}</Text>
                <Text numberOfLines={1}>{sitter.bio}</Text>
                <Text>{sitter.location}</Text>
            </View>
            <View>
                <Text style={styles.priceAmount}>{sitter.price_per_night}€</Text>
                <Text style={styles.price}>per night</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        padding: spacing.lg,
        gap: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        borderRadius: 12,
    },
    circle: {
        backgroundColor: colors.disabled,
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    info: {
        flex: 1,
        gap: 2,
    },
    priceAmount: {
        fontWeight: 'bold',
        fontSize: textSizes.paragraphBig,
        color: colors.green,
    },
    price: {
        color: colors.disabled,
        fontSize: textSizes.paragraph,
        textAlign: 'right',
    },
});