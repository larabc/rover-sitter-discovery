import { useEffect, useState } from "react"
import { toTimeString } from "../utils/timeUtils"
import BASE_URL from "../api/client"
import { DateOverride } from "../types/availability"
import { DEFAULT_END_TIME, DEFAULT_START_TIME, DEFAULT_SITTER_ID } from "../constants/defaults"
import Toast from 'react-native-toast-message';
import { MESSAGES } from "../constants/messages"


export function useOverrides() {
    const [overrides, setOverrides] = useState<DateOverride[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadingSlotId, setLoadingSlotId] = useState<null | number>(null)
    const [error, setError] = useState<null | string>(null)

    const handleDateChange = async (override: DateOverride, newDate: Date) => {
        setLoadingSlotId(override.id)

        try {
            const response = await fetch(`${BASE_URL}/overrides/${override.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: newDate.toISOString().split('T')[0],
                    start_time: override.start_time,
                    end_time: override.end_time,
                    is_available: override.is_available,
                    sitter: DEFAULT_SITTER_ID
                })
            })
            if (response.ok) {
                const updatedOverride = await response.json()
                setOverrides(overrides.map(o => o.id === updatedOverride.id ? updatedOverride : o))
                setLoadingSlotId(null)
                Toast.show({ type: 'success', text1: MESSAGES.SLOT_UPDATED })
            } else {
                setLoadingSlotId(null)
                const errorData = await response.json()
                Toast.show({ type: 'error', text1: errorData.non_field_errors?.[0] || MESSAGES.SLOT_UPDATE_ERROR })
            }
        } catch (error) {
            setLoadingSlotId(null)
            setError(MESSAGES.CONNECTION_ERROR)
        }
    }

    const handleStartTimeChange = async (override: DateOverride, newStartTime: Date) => {
        setLoadingSlotId(override.id)

        try {
            const response = await fetch(`${BASE_URL}/overrides/${override.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: override.date,
                    start_time: toTimeString(newStartTime.getHours()),
                    end_time: override.end_time,
                    is_available: override.is_available,
                    sitter: DEFAULT_SITTER_ID
                })
            })
            if (response.ok) {
                const updatedOverride = await response.json()
                setOverrides(overrides.map(o => o.id === updatedOverride.id ? updatedOverride : o))
                setLoadingSlotId(null)
                Toast.show({ type: 'success', text1: MESSAGES.SLOT_UPDATED })
            } else {
                setLoadingSlotId(null)
                const errorData = await response.json()
                Toast.show({ type: 'error', text1: errorData.non_field_errors?.[0] || MESSAGES.SLOT_UPDATE_ERROR })
            }
        } catch (error) {
            setLoadingSlotId(null)
            setError(MESSAGES.CONNECTION_ERROR)
        }
    }


    const handleEndTimeChange = async (override: DateOverride, newEndTime: Date) => {
        setLoadingSlotId(override.id)

        try {
            const response = await fetch(`${BASE_URL}/overrides/${override.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: override.date,
                    start_time: override.start_time,
                    end_time: toTimeString(newEndTime.getHours()),
                    is_available: override.is_available,
                    sitter: DEFAULT_SITTER_ID
                })
            })
            if (response.ok) {
                const updatedOverride = await response.json()
                setOverrides(overrides.map(o => o.id === updatedOverride.id ? updatedOverride : o))
                setLoadingSlotId(null)
                Toast.show({ type: 'success', text1: MESSAGES.SLOT_UPDATED })
            } else {
                setLoadingSlotId(null)
                const errorData = await response.json()
                Toast.show({ type: 'error', text1: errorData.non_field_errors?.[0] || MESSAGES.SLOT_UPDATE_ERROR })
            }
        } catch (error) {
            setLoadingSlotId(null)
            setError(MESSAGES.CONNECTION_ERROR)
        }
    }

    const handleAddOverride = async (isAvailable: boolean) => {
        console.log('Entering in handleOverride');

        try {
            setIsLoading(true)

            const body = isAvailable
                ? {
                    start_time: DEFAULT_START_TIME,
                    end_time: DEFAULT_END_TIME,
                    date: new Date().toISOString().split('T')[0],
                    is_available: true,
                    sitter: DEFAULT_SITTER_ID
                }
                : {
                    date: new Date().toISOString().split('T')[0],
                    is_available: false,
                    sitter: DEFAULT_SITTER_ID
                }
            console.log('Body:', body)


            const response = await fetch(`${BASE_URL}/overrides/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })


            if (response.ok) {
                const newOverride = await response.json()
                setOverrides([...overrides, newOverride])
                setIsLoading(false)
                Toast.show({ type: 'success', text1: MESSAGES.SLOT_ADDED })
            } else {
                setIsLoading(false)
                const errorData = await response.json()
                Toast.show({ type: 'error', text1: errorData.non_field_errors?.[0] || MESSAGES.SLOT_ADD_ERROR })
            }

        }
        catch (error) {
            setIsLoading(false)
            console.log
            setError('Connection lost. Try again later.')
        }

    }

    const handleDeleteOverride = async (id: number) => {
        setLoadingSlotId(id)
        try {
            const response = await fetch(`${BASE_URL}/overrides/${id}/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.ok) {
                setOverrides(overrides.filter((slot) => slot.id !== id))
                setLoadingSlotId(id)
                Toast.show({ type: 'success', text1: MESSAGES.SLOT_DELETED })
            } else {
                setLoadingSlotId(id)
                const errorData = await response.json()
                Toast.show({ type: 'error', text1: errorData.non_field_errors?.[0] || MESSAGES.SLOT_DELETE_ERROR })
            }
        }
        catch (error) {
            setLoadingSlotId(id)
            setError(MESSAGES.CONNECTION_ERROR)
        }

    }

    const handleToggleAvailable = async (override: DateOverride) => {
        setLoadingSlotId(override.id)
        const newIsAvailable = !override.is_available

        try {
            const response = await fetch(`${BASE_URL}/overrides/${override.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: override.date,
                    start_time: newIsAvailable ? DEFAULT_START_TIME : null,
                    end_time: newIsAvailable ? DEFAULT_END_TIME : null,
                    is_available: newIsAvailable,
                    sitter: DEFAULT_SITTER_ID
                })
            })
            if (response.ok) {
                const updatedOverride = await response.json()
                setOverrides(overrides.map(o => o.id === updatedOverride.id ? updatedOverride : o))
                setLoadingSlotId(null)
                Toast.show({ type: 'success', text1: MESSAGES.SLOT_UPDATED })
            } else {
                setLoadingSlotId(null)
                const errorData = await response.json()
                Toast.show({ type: 'error', text1: errorData.non_field_errors?.[0] || MESSAGES.SLOT_UPDATE_ERROR })
            }
        } catch (error) {
            setLoadingSlotId(null)
            setError(MESSAGES.CONNECTION_ERROR)
        }
    }




    useEffect(() => {
        async function fetchOverrides() {
            try {
                const response = await fetch(BASE_URL + `/overrides/?id=${DEFAULT_SITTER_ID}`)
                if (response.ok) {
                    const overrides = await response.json()
                    setOverrides(overrides)
                    setIsLoading(false)
                } else {
                    const errorData = await response.json()
                    console.log('Error response:', response.status, errorData)
                    setIsLoading(false)
                    setError(MESSAGES.LOAD_ERROR)
                }
            } catch (error) {
                setIsLoading(false)
                setError(MESSAGES.CONNECTION_ERROR)
            }
        }
        fetchOverrides()
    }, [])

    return {
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
    }
}