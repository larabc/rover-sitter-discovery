import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { colors, spacing, textSizes, textStyles } from '../constants/theme'
import { Sitter } from '../types/sitter'


interface SitterCardProps {
    sitter: Sitter
}

export default function SitterCard({ sitter }: SitterCardProps) {
    return (
        <View style={styles.card}>
            <Image
                source={sitter.avatar_url
                    ? { uri: sitter.avatar_url }
                    : require("../../assets/user.png")}
                style={styles.circle}
            />
            <View style={styles.info}>
                <Text style={textStyles.sectionHeader}>{sitter.name}</Text>
                <Text style={styles.bio} numberOfLines={1}>{sitter.bio}</Text>
                <Text>{sitter.location}</Text>
            </View>
            <View>
                <Text style={styles.priceAmount}>{sitter.price}€</Text>
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
        backgroundColor: colors.white,
        borderRadius: 16,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    circle: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    info: {
        flex: 1,
        gap: 2,
    },
    bio: {
        color: colors.gray,
        fontSize: textSizes.paragraph,
    },
    location: {
        color: colors.gray,
        fontSize: textSizes.paragraph,
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