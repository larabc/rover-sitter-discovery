import { colors, iconSizes, layoutStyles, spacing } from "../../src/constants/theme"
import Header from "../../src/components/Header"
import { CirclePlus, Frown, Trash2 } from "lucide-react-native"
import { Pressable, ScrollView, useWindowDimensions, StyleSheet, Text, View, ActivityIndicator } from "react-native"
import Loader from "../../src/components/Loader"
import { useOverrides } from "../../src/hooks/useOverrides"
import DatePicker from "../../src/components/DatePicker"
import TimePicker from "../../src/components/TimePicker"
import CustomButton from "../../src/components/CustomButton"


export default function AdjustedAvailability() {
    const { height } = useWindowDimensions()


    const { overrides,
        isLoading,
        loadingSlotId,
        error,
        handleDateChange,
        handleStartTimeChange,
        handleEndTimeChange,
        handleAddOverride,
        handleDeleteOverride,
    } = useOverrides()

    return (
        <ScrollView style={layoutStyles.generalContainer}>
            <Header label='Adjusted availability' />

            <View style={styles.container}>
                {error ? (
                    <View style={layoutStyles.errorContainer}>
                        <Frown />
                        <Text>{error}</Text>
                    </View>

                ) :
                    isLoading ? (
                        <Loader height={height} />
                    ) : (
                        <View style={styles.overrideContainer}>
                            {overrides.map((override) => (

                                <View key={override.id} style={styles.overrideSlot}>

                                    {override.is_available ? (
                                        <View style={styles.card}>
                                            <DatePicker value={new Date(override.date)} onChange={(value) => handleDateChange(override, value)}></DatePicker>
                                            <TimePicker value={override.start_time!} onChange={(value) => handleStartTimeChange(override, value)} />
                                            <Text>-</Text>
                                            <TimePicker value={override.end_time!} onChange={(value) => handleEndTimeChange(override, value)} />
                                        </ View>
                                    ) : (
                                        <View style={styles.card}>
                                            <DatePicker value={new Date(override.date)} onChange={(value) => handleDateChange(override, value)}></DatePicker>

                                            <Text>Unavailable</Text>

                                        </ View>

                                    )}
                                    {override.id === loadingSlotId ? (
                                        <ActivityIndicator size="small" color={colors.accent} />
                                    ) : (
                                        <Pressable onPress={() => handleDeleteOverride(override.id)} hitSlop={12} style={styles.iconButton}>
                                            <Trash2 color={colors.red} size={iconSizes.medium} />
                                        </Pressable>
                                    )}

                                </View>
                            ))}
                            <CustomButton label="Add override" variant="outlined" onPressFn={() => handleAddOverride(false)}
                                accesibilityLabel='Button for searching sitters based on the provided parameters' />
                        </View>
                    )
                }

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        gap: spacing.md,
        flex: 1,
    },
    iconButton: {
        padding: spacing.sm,
    },
    overrideContainer: {
        gap: spacing.md,
    },
    overrideSlot: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.sm
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md
    }
});
