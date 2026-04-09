import { View, Text, StyleSheet, ActivityIndicator, useWindowDimensions, Pressable } from 'react-native'
import { colors, iconSizes, layoutStyles, spacing, textStyles } from '../../src/constants/theme'
import SitterCard from '../../src/components/SitterCard'
import { useSitters } from '../../src/hooks/useSitters'
import Header from '../../src/components/Header'
import { CalendarX, Frown } from 'lucide-react-native'
import Loader from '../../src/components/Loader'
import { Link, router, useLocalSearchParams } from 'expo-router'

export default function Sitters() {
    const { height } = useWindowDimensions()
    const { sitters, isLoading, error } = useSitters()
    const { date, start_time, end_time } = useLocalSearchParams();
    const formattedDate = new Date(date as string).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    return (
        <View style={layoutStyles.generalContainer}>
            <Header label='Sitters' />
            <View style={styles.contentContainer}>
                <Text style={styles.dateSelected}>Available on {formattedDate} · {(start_time as string).slice(0, 5)} - {(end_time as string).slice(0, 5)}:</Text>

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
        justifyContent: 'center',
    },
    dateSelected: {
        fontSize: 16,
        color: colors.gray,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: "flex-start",
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center'
    }
});
