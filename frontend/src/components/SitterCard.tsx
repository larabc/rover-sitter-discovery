import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors, spacing, textStyles } from '../constants/theme'
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
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.border


    },
    circle: {
        backgroundColor: '#b4b4b4',
        width: 48,
        borderRadius: 48,

    },
    info: {
        gap: 2,
    },
    priceAmount: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#1B6C42'
    },
    price: {
        color: colors.disabled,
    }
}
);
