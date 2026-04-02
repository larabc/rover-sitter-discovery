import { View, StyleSheet, ScrollView, useWindowDimensions, Text } from 'react-native'
import { AvailabilitySlot, DayOfWeek } from '../../src/types/availability'
import { layoutStyles, spacing } from '../../src/constants/theme';
import WeekDayManager from '../../src/components/WeekDayManager';
import { useAvailability } from '../../src/hooks/useAvailability';
import Header from '../../src/components/Header';
import Loader from '../../src/components/Loader';
import { Frown } from 'lucide-react-native';

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
        handleUpdateSlot,
        error } = useAvailability()


    return (
        <ScrollView style={layoutStyles.generalContainer}>
            <Header label='My Availability' />

            <View style={styles.container}>
                {error ? (
                    <View style={styles.errorContainer}>
                        <Frown />
                        <Text>{error}</Text>
                    </View>

                ) :
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
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.md
    }
});
