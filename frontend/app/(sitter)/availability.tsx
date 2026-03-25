import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AvailabilitySlot, DayOfWeek } from '../../src/types/availability'
import { useRouter } from 'expo-router';
import { spacing } from '../../src/constants/theme';
import WeekDayManager from '../../src/components/WeekDayManager';
import BASE_URL from '../../src/api/client';
import CustomButton from "../../src/components/CustomButton"

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

    //add loading state
    useEffect(() => {
        async function fetchSlots() {
            try {
                const response = await fetch(BASE_URL + '/slots/?id=1')
                if (response.ok) {
                    const availability_slots = await response.json()
                    setAvailabilitySlots(availability_slots)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchSlots()
    }, [])

    return (
        <View>
            <CustomButton label="Back" onPressFn={() => router.back()} accesibilityLabel='Button for going back to home page' />
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
