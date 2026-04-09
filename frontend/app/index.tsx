import { View, Text, StyleSheet, Image } from 'react-native'
import CustomButton from "../src/components/CustomButton"
import React from 'react'
import { useRouter } from 'expo-router';
import { colors, fontFamilyTitle, spacing, textSizes } from '../src/constants/theme';

export default function App() {
    const router = useRouter();

    return (
        <View style={styles.container}>

            <Image
                source={require('../../frontend/assets/image.png')}
                style={{ width: 200, height: 200, alignItems: 'center', marginInline: 'auto', }}
            />
            <View style={styles.header}>
                <Text style={styles.text}>You are a pet...</Text>
            </View>
            <CustomButton label="Sitter" variant="filled" onPressFn={() => router.push('/(sitter)/availability')} accesibilityLabel='Button that goes to sitter availaibilty page' />
            <CustomButton label="Owner" variant="filled" onPressFn={() => router.push('/(owner)/search')} accesibilityLabel='Button that goes to owner role search page' />

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
    header: {
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    text: {
        color: colors.primary,
        fontSize: textSizes.titleLarge,
        textAlign: 'center',
        fontFamily: fontFamilyTitle.frauncesSemiBold

    }
});