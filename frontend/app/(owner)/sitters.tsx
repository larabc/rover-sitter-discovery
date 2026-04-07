import { View, Text, StyleSheet, ActivityIndicator, useWindowDimensions, Pressable } from 'react-native'
import { colors, iconSizes, layoutStyles, spacing, textStyles } from '../../src/constants/theme'
import SitterCard from '../../src/components/SitterCard'
import { useSitters } from '../../src/hooks/useSitters'
import Header from '../../src/components/Header'
import { CalendarX, Frown } from 'lucide-react-native'
import Loader from '../../src/components/Loader'
import { Link, router } from 'expo-router'

export default function Sitters() {
    const { height } = useWindowDimensions()
    const { sitters, isLoading, error } = useSitters()
    return (
        <View style={layoutStyles.generalContainer}>
            <Header label='Sitters' />
            <View style={styles.contentContainer}>
                {error ? (
                    <View style={layoutStyles.errorContainer}>
                        <Frown />
                        <Text>{error}</Text>
                    </View>

                ) : isLoading ? (
                    <View style={layoutStyles.loadingContainer}>
                        <Loader height={height} />
                    </View>
                ) :

                    sitters.length > 0 ? (
                        sitters.map((sitter) => (
                            <SitterCard key={sitter.id} sitter={sitter} />
                        ))
                    ) : (
                        <View style={styles.noResultsContainer}>
                            <CalendarX color={colors.navy} size={iconSizes.large} />
                            <Text style={textStyles.sectionHeader}>No sitters found for this time</Text>
                            <Pressable onPress={() => router.back()}>
                                <Text style={layoutStyles.link}>Try a different time or date →</Text>
                            </Pressable>
                        </View>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        gap: spacing.md,
        padding: spacing.lg,
    },
    noResultsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
