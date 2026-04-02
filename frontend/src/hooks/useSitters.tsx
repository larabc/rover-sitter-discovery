import { useEffect, useState } from "react"
import { Sitter } from "../types/sitter"
import BASE_URL from "../api/client"
import { useLocalSearchParams } from "expo-router"

export function useSitters() {
    const [sitters, setSitters] = useState<Sitter[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)

    const { date, start_time, end_time } = useLocalSearchParams()

    useEffect(() => {
        async function fetchSitters() {
            try {
                const response = await fetch(`${BASE_URL}/sitters/search/?date=${date}&start_time=${start_time}&end_time=${end_time}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                if (response.ok) {
                    const availability_sitters = await response.json()
                    setSitters(availability_sitters)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    setError('Error loading sitters. Try again later.')
                }
            } catch (error) {
                setIsLoading(false)
                setError('Connection lost. Try again later.')
                console.error(error)
            }
        }
        fetchSitters()
    }, [])

    return {
        sitters,
        isLoading,
        error
    }

}