import { useEffect, useState } from "react"
import { toTimeString } from "../utils/timeUtils"
import BASE_URL from "../api/client"
import { AvailabilitySlot } from "../types/availability"
import { DEFAULT_END_TIME, DEFAULT_START_TIME, DEFAULT_SITTER_ID } from "../constants/defaults"


export function useAvailability() {
    const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadingDay, setLoadingDay] = useState<null | number>(null)
    const [loadingSlotId, setLoadingSlotId] = useState<null | number>(null)
    const [error, setError] = useState<null | string>(null)

    const getDefaultSlotTimes = (day: number): { start_time: string, end_time: string } => {
        const slotsForDay = availabilitySlots.filter(slot => slot.day_of_week === day)
        const lastSlot = slotsForDay[slotsForDay.length - 1]
        let start_time: string = DEFAULT_START_TIME
        let end_time: string = DEFAULT_END_TIME
        if (lastSlot) {
            const start = Math.min(parseInt(lastSlot.end_time.split(':')[0])
                + 2, 22)
            const end = Math.min(start + 4, 23)
            start_time = toTimeString(start)
            end_time = toTimeString(end)
        }

        return { start_time, end_time }
    }

    const handleAddSlot = async (day: number) => {
        try {
            setLoadingDay(day)
            const { start_time, end_time } = getDefaultSlotTimes(day)



            const response = await fetch(`${BASE_URL}/slots/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ start_time, end_time, day_of_week: day, sitter: DEFAULT_SITTER_ID }) //set sitter 1 hardcoded
            })

            if (response.ok) {
                const newSlot = await response.json()
                setAvailabilitySlots([...availabilitySlots, newSlot])
                setLoadingDay(null)
            } else {
                setLoadingSlotId(null)
                const errorData = await response.json()
                setError(errorData.non_field_errors?.[0] || 'Slot unavailable to add.')
            }

        }
        catch (error) {
            setLoadingDay(null)
            setError('Connection lost. Try again later.')
        }

    }

    const handleDeleteSlot = async (id: number) => {
        setLoadingSlotId(id)
        try {
            const response = await fetch(`${BASE_URL}/slots/${id}/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.ok) {
                setAvailabilitySlots(availabilitySlots.filter((slot) => slot.id !== id))
                setLoadingSlotId(null)
            } else {
                setError('Slot unavailable to delete.')
            }
        }
        catch (error) {
            setLoadingSlotId(null)
            setError('Connection lost. Try again later.')
        }

    }

    const handleUpdateSlot = async (slot: AvailabilitySlot, time: string, selectedTime?: Date) => {
        setError(null)

        setLoadingSlotId(slot.id)


        let start_time = slot.start_time;
        let end_time = slot.end_time;

        if (time === 'start_time' && selectedTime) {
            start_time = toTimeString(selectedTime.getHours())
        }

        if (time === 'end_time' && selectedTime) {
            end_time = toTimeString(selectedTime.getHours())
        }

        if (start_time < end_time) {
            try {
                const response = await fetch(`${BASE_URL}/slots/${slot.id}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ start_time: start_time, end_time: end_time, day_of_week: slot.day_of_week, sitter: DEFAULT_SITTER_ID })
                })

                if (response.ok) {
                    const updatedSlot = await response.json()

                    setAvailabilitySlots(availabilitySlots.map(slot => slot.id === updatedSlot.id ? updatedSlot : slot))
                    setLoadingSlotId(null)
                } else {
                    setLoadingSlotId(null)
                    const errorData = await response.json()
                    setError(errorData.non_field_errors?.[0] || 'Slot unavailable to update.')
                }
            }
            catch (error) {
                setLoadingSlotId(null)
                setError('Connection lost. Try again later.')
            }
        } else {
            setLoadingSlotId(null)
            setError('Invalidate times selected')
        }

    }
    useEffect(() => {
        async function fetchSlots() {
            try {
                const response = await fetch(BASE_URL + `/slots/?id=${DEFAULT_SITTER_ID}`)
                if (response.ok) {
                    const availability_slots = await response.json()
                    setAvailabilitySlots(availability_slots)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    setError('Unable to load availability. Try again later.')
                }
            } catch (error) {
                setIsLoading(false)
                setError('Connection lost. Try again later.')
            }
        }
        fetchSlots()
    }, [])

    return {
        availabilitySlots,
        isLoading,
        error,
        loadingSlotId,
        loadingDay,
        handleAddSlot,
        handleDeleteSlot,
        handleUpdateSlot,
    }
}