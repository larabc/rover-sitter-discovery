import { colors, iconSizes, layoutStyles, spacing } from "../../src/constants/theme"
import Header from "../../src/components/Header"
import { CirclePlus, Frown, Trash2 } from "lucide-react-native"
import { Pressable, ScrollView, useWindowDimensions, StyleSheet, Text, View, ActivityIndicator, Switch } from "react-native"
import Loader from "../../src/components/Loader"
import { useOverrides } from "../../src/hooks/useOverrides"
import DatePicker from "../../src/components/DatePicker"
import TimePicker from "../../src/components/TimePicker"
import CustomButton from "../../src/components/CustomButton"
import { DateOverride } from "../../src/types/availability"


export default function AdjustedAvailability() {
    const { height } = useWindowDimensions()


    const {
        overrides,
        isLoading,
        error,
        loadingSlotId,
        handleAddOverride,
        handleDeleteOverride,
        handleStartTimeChange,
        handleEndTimeChange,
        handleDateChange,
        handleToggleAvailable
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
                            {overrides.map((override: DateOverride) => (
                                <View key={override.id} style={styles.overrideSlot}>
                                    <View style={styles.topRow}>
                                        <Switch value={override.is_available} onValueChange={() => handleToggleAvailable(override)} disabled={override.id === loadingSlotId} />
                                        <DatePicker isInline={true} value={new Date(override.date)} onChange={(value) => handleDateChange(override, value)} />
                                        {override.id === loadingSlotId ? (
                                            <ActivityIndicator size="small" color={colors.accent} />
                                        ) : (
                                            <Pressable onPress={() => handleDeleteOverride(override.id)} hitSlop={12}>
                                                <Trash2 color={colors.red} size={iconSizes.medium} />
                                            </Pressable>
                                        )}
                                    </View>
                                    {override.is_available ? (
                                        <View style={styles.bottomRow}>
                                            <TimePicker disabled={override.id === loadingSlotId} value={override.start_time!} onChange={(value) => handleStartTimeChange(override, value)} />
                                            <Text>-</Text>
                                            <TimePicker disabled={override.id === loadingSlotId} value={override.end_time!} onChange={(value) => handleEndTimeChange(override, value)} />
                                        </View>
                                    ) : (
                                        <View style={styles.bottomRow}>
                                            <Text style={{ color: colors.gray }}>Not available this day</Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                            <CustomButton label="Add new override" variant="filled" onPressFn={() => handleAddOverride(true)}
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
        justifyContent: 'space-between',
        flex: 1,
    },
    overrideSlot: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: 12,
        gap: spacing.sm,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,

    },
});
