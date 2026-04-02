import { renderHook, waitFor } from '@testing-library/react-native'
import { useSitters } from '../useSitters'

jest.mock('expo-router', () => ({
    useLocalSearchParams: () => ({
        date: '2026-03-30',
        start_time: '09:00:00',
        end_time: '18:00:00'
    })
}))

describe('useSitters', () => {

    test('initial state has empty sitters, isLoading true and no error', () => {
        const { result } = renderHook(() => useSitters())

        expect(result.current.sitters).toEqual([])
        expect(result.current.isLoading).toBe(true)
        expect(result.current.error).toBeNull()
    })

    test('Fetch sitters successfully sets sitters and isLoading false', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => [{ name: 'Ananda', bio: 'test bio', price_per_night: 25, location: 'Barcelona', id: 1 }]
        })
        const { result } = renderHook(() => useSitters())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        expect(result.current.sitters).toHaveLength(1)
        expect(result.current.error).toBeNull()

    })

    test('Fetch sitters failure sets error and isLoading false', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => []
        })

        const { result } = renderHook(() => useSitters())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })
        expect(result.current.sitters).toHaveLength(0)
        expect(result.current.error).toBe('Error loading sitters. Try again later.')
    })

    test('network error sets connection error message', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

        const { result } = renderHook(() => useSitters())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        expect(result.current.error).toBe('Connection lost. Try again later.')
    })
})