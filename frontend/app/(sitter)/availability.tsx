import { View, StyleSheet, ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native'
import { AvailabilitySlot, DayOfWeek } from '../../src/types/availability'
import { useRouter } from 'expo-router';
import { colors, layoutStyles, spacing, textStyles } from '../../src/constants/theme';
import WeekDayManager from '../../src/components/WeekDayManager';
import { useAvailability } from '../../src/hooks/useAvailability';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../src/components/Header';
import Loader from '../../src/components/Loader';

export default function Availability() {

    const { height } = useWindowDimensions()

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
        <ScrollView style={layoutStyles.generalContainer}>
            <Header label='My Availability' />

            <View style={styles.container}>
                {
                    isLoading ? (
                        <Loader height={height} />
                    ) :
                        days.map((day) => (
                            <WeekDayManager key={day} day={day} slots={groupSlotsByDay(availabilitySlots)[day]} onAddSlot={() => handleAddSlot(day)} onDeleteSlot={handleDeleteSlot} onUpdateSlot={handleUpdateSlot} isAddingSlot={loadingDay === day} loadingSlotId={loadingSlotId} />
                        ))
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
    }
});
