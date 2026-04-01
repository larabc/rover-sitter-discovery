import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { AvailabilitySlot, DayOfWeek } from '../../src/types/availability'
import { useRouter } from 'expo-router';
import { colors, layoutStyles, spacing } from '../../src/constants/theme';
import WeekDayManager from '../../src/components/WeekDayManager';
import BASE_URL from '../../src/api/client';
import CustomButton from "../../src/components/CustomButton"
import { hoursToTimeString } from '../../src/utils/timeUtils';
import { useAvailability } from '../../src/hooks/useAvailability';

export default function Availability() {
    const router = useRouter();

    const groupSlotsByDay = (slots: AvailabilitySlot[]): Record<number, AvailabilitySlot[]> => {
        return slots.reduce((slotsByDay, slot) => {
            const day = slot.day_of_week
            slotsByDay[day] = [...(slotsByDay[day] || []), slot]
            return slotsByDay
        }, {} as Record<number, AvailabilitySlot[]>)
    }

    const days = Object.values(DayOfWeek).filter(v => typeof v === 'number')


    const { availabilitySlots,
        isLoading,
        loadingSlotId,
        loadingDay,
        handleAddSlot,
        handleDeleteSlot,
        handleUpdateSlot, } = useAvailability()


    return (
        <View style={layoutStyles.generalContainer}>
            <CustomButton label="Back" onPressFn={() => router.back()} accesibilityLabel='Button for going back to home page' />
            <Text>My availability</Text>
            <View style={styles.container}>
                {
                    isLoading ? (
                        <View style={layoutStyles.loadingContainer}>
                            <ActivityIndicator size="large" color={colors.accent} />
                        </View>
                    ) :
                        days.map((day) => (
                            <WeekDayManager key={day} day={day} slots={groupSlotsByDay(availabilitySlots)[day]} onAddSlot={() => handleAddSlot(day)} onDeleteSlot={handleDeleteSlot} onUpdateSlot={handleUpdateSlot} isAddingSlot={loadingDay === day} loadingSlotId={loadingSlotId} />
                        ))
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
        gap: spacing.md,
        flex: 1,
    }
});
