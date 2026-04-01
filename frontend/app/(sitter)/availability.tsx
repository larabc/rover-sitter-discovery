import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { AvailabilitySlot, DayOfWeek } from '../../src/types/availability'
import { useRouter } from 'expo-router';
import { colors, layoutStyles, spacing } from '../../src/constants/theme';
import WeekDayManager from '../../src/components/WeekDayManager';
import BASE_URL from '../../src/api/client';
import CustomButton from "../../src/components/CustomButton"
import { hoursToTimeString } from '../../src/utils/timeUtils';

export default function Availability() {
    const router = useRouter();

    const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadingDay, setLoadingDay] = useState<null | number>(null)
    const [loadingSlotId, setLoadingSlotId] = useState<null | number>(null)

    const groupSlotsByDay = (slots: AvailabilitySlot[]): Record<number, AvailabilitySlot[]> => {
        return slots.reduce((slotsByDay, slot) => {
            const day = slot.day_of_week
            slotsByDay[day] = [...(slotsByDay[day] || []), slot]
            return slotsByDay
        }, {} as Record<number, AvailabilitySlot[]>)
    }

    const days = Object.values(DayOfWeek).filter(v => typeof v === 'number')

    useEffect(() => {
        async function fetchSlots() {
            try {
                const response = await fetch(BASE_URL + '/slots/?id=1')
                if (response.ok) {
                    const availability_slots = await response.json()
                    setAvailabilitySlots(availability_slots)
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }
        }
        fetchSlots()
    }, [])

    const getDefaultSlotTimes = (day: number): { start_time: string, end_time: string } => {
        const slotsForDay = availabilitySlots.filter(slot => slot.day_of_week === day)
        const lastSlot = slotsForDay[slotsForDay.length - 1]
        let start_time: string = '09:00:00'
        let end_time: string = '18:00:00'
        if (lastSlot) {
            const start = Math.min(parseInt(lastSlot.end_time.split(':')[0])
                + 2, 22)
            const end = Math.min(start + 4, 23)
            start_time = hoursToTimeString(start)
            end_time = hoursToTimeString(end)
        }

        return { start_time, end_time }
    }

    const handleAddSlot = async (day: number) => {
        setLoadingDay(day)
        const { start_time, end_time } = getDefaultSlotTimes(day)

        const response = await fetch(`${BASE_URL}/slots/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start_time, end_time, day_of_week: day, sitter: 1 }) //set sitter 1 hardcoded
        })
        const newSlot = await response.json()
        setAvailabilitySlots([...availabilitySlots, newSlot])
        setLoadingDay(null)
    }

    const handleDeleteSlot = async (id: number) => {
        setLoadingSlotId(id)

        const response = await fetch(`${BASE_URL}/slots/${id}/`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })

        setAvailabilitySlots(availabilitySlots.filter((slot) => slot.id !== id))
        setLoadingSlotId(null)

    }

    const handleUpdateSlot = async (slot: AvailabilitySlot, time: string, selectedTime?: Date) => {
        setLoadingSlotId(slot.id)


        let start_time = slot.start_time;
        let end_time = slot.end_time;

        if (time === 'start_time' && selectedTime) {
            start_time = hoursToTimeString(selectedTime.getHours())
        }

        if (time === 'end_time' && selectedTime) {
            end_time = hoursToTimeString(selectedTime.getHours())
        }


        const response = await fetch(`${BASE_URL}/slots/${slot.id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start_time: start_time, end_time: end_time, day_of_week: slot.day_of_week, sitter: 1 }) //hardcoded sitter id: 1
        })

        const updatedSlot = await response.json()

        setAvailabilitySlots(availabilitySlots.map(slot => slot.id === updatedSlot.id ? updatedSlot : slot))
        setLoadingSlotId(null)
    }


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
