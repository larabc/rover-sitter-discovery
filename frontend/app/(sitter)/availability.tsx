import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AvailabilitySlot, DayOfWeek } from '../../src/types/availability'
import { useRouter } from 'expo-router';
import { spacing } from '../../src/constants/theme';
import WeekDayManager from '../../src/components/WeekDayManager';


export default function Availability() {
    const router = useRouter();

    const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([])

    const groupSlotsByDay = (slots: AvailabilitySlot[]): Record<number, AvailabilitySlot[]> => {
        return slots.reduce((slotsByDay, slot) => {
            const day = slot.day_of_week
            slotsByDay[day] = [...(slotsByDay[day] || []), slot]
            return slotsByDay
        }, {} as Record<number, AvailabilitySlot[]>)
    }

    const days = Object.values(DayOfWeek).filter(v => typeof v === 'number')

    return (
        <View>
            <Text >My availability</Text>
            <View style={styles.container}>

                {
                    days.map((day) => (
                        <WeekDayManager key={day} day={DayOfWeek[day]} slots={groupSlotsByDay(availabilitySlots)[day]} />
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
    }
});
