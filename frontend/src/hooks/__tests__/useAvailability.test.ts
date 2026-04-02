import { renderHook, waitFor } from '@testing-library/react-native'
import { useAvailability } from '../useAvailability'

describe('useAvailability', () => {
    test('initial state has empty slots, isLoading true and no error', () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => []
        })
        const { result } = renderHook(() => useAvailability())

        expect(result.current.availabilitySlots).toEqual([])
        expect(result.current.isLoading).toBe(true)
        expect(result.current.error).toBeNull()
    })

    test('Fetch slots successfully sets availabilitySlots and isLoading false', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => [{ id: 1, day_of_week: 0, start_time: '09:00:00', end_time: '18:00:00', sitter: 1 }]
        })
        const { result } = renderHook(() => useAvailability())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        expect(result.current.availabilitySlots).toHaveLength(1)
        expect(result.current.error).toBeNull()

    })

    test('Fetch slots failure sets error and isLoading false', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: async () => []
        })

        const { result } = renderHook(() => useAvailability())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })
        expect(result.current.availabilitySlots).toHaveLength(0)
        expect(result.current.error).toBe('Unable to load availability. Try again later.')
    })

    test('network error sets connection error message', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

        const { result } = renderHook(() => useAvailability())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        expect(result.current.error).toBe('Connection lost. Try again later.')
    })

})