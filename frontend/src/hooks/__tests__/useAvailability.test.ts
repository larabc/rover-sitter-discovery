jest.mock('react-native-toast-message', () => ({
    show: jest.fn(),
}))

import Toast from 'react-native-toast-message'
import { renderHook, waitFor, act } from '@testing-library/react-native'
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

    test('handleUpdateSlot shows toast when start_time >= end_time', async () => {
        const mockSlot = { id: 1, day_of_week: 0, start_time: '09:00:00', end_time: '18:00:00', sitter: 1 }

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => [mockSlot]
        })

        const { result } = renderHook(() => useAvailability())

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        await act(async () => {
            result.current.handleUpdateSlot(mockSlot, 'start_time', new Date(2026, 0, 1, 20, 0))
        })

        expect(result.current.availabilitySlots).toHaveLength(1)
        expect(Toast.show).toHaveBeenCalledWith({
            type: 'error',
            text1: 'Start time must be before end time'
        })
        expect(fetch).toHaveBeenCalledTimes(1)

    })

    test('handleUpdateSlot shows toast when backend denies because overlapping with existing slot', async () => {
        const mockSlot = { id: 1, day_of_week: 0, start_time: '09:00:00', end_time: '18:00:00', sitter: 1 }

        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [mockSlot]
            })
            .mockResolvedValueOnce({
                ok: false,
                json: async () => ({ non_field_errors: ['This time overlaps with an existing slot'] })
            })

        const { result } = renderHook(() => useAvailability())

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        await act(async () => {
            result.current.handleUpdateSlot(mockSlot, 'start_time', new Date(2026, 0, 1, 10, 0))
        })

        expect(result.current.availabilitySlots).toHaveLength(1)
        expect(Toast.show).toHaveBeenCalledWith({
            type: 'error',
            text1: 'This time overlaps with an existing slot'
        })

    })

    test('handleAddSlot shows toast when backend denies because overlapping with existing slot', async () => {
        const mockSlot = { id: 1, day_of_week: 0, start_time: '09:00:00', end_time: '18:00:00', sitter: 1 }

        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [mockSlot]
            })
            .mockResolvedValueOnce({
                ok: false,
                json: async () => ({ non_field_errors: ['This time overlaps with an existing slot'] })
            })

        const { result } = renderHook(() => useAvailability())

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        await act(async () => {
            result.current.handleAddSlot(0)
        })

        expect(result.current.availabilitySlots).toHaveLength(1)
        expect(Toast.show).toHaveBeenCalledWith({
            type: 'error',
            text1: 'This time overlaps with an existing slot'
        })
    })
})