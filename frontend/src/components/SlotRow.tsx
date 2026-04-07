import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { AvailabilitySlot } from '../types/availability'
import { Trash2 } from 'lucide-react-native'
import { colors, layoutStyles, spacing } from '../constants/theme'
import TimePicker from './TimePicker'

interface SlotRowProps {
    slot: AvailabilitySlot,
    onDeleteSlot: (id: number) => void,
    onAddSlot: () => void,
    onUpdateSlot: (slot: AvailabilitySlot, time: string, selectedTime?: Date) => void,
    loadingSlotId: number | null,
    isDisabled: boolean
}

export default function SlotRow({ slot, onDeleteSlot, onAddSlot, onUpdateSlot, loadingSlotId,
    isDisabled
}: SlotRowProps) {

    return (
        <View style={styles.row}>
            <View style={styles.timesContainer}>
                <TimePicker
                    value={slot.start_time}
                    onChange={(selectedDate) => onUpdateSlot(slot, 'start_time', selectedDate)}
                    disabled={isDisabled}
                />
                <Text style={layoutStyles.separator}>-</Text>
                <TimePicker
                    value={slot.end_time}
                    onChange={(selectedDate) => onUpdateSlot(slot, 'end_time', selectedDate)}
                    disabled={isDisabled}
                />
            </View>
            {slot.id === loadingSlotId ? (
                <ActivityIndicator size="small" color={colors.accent} />
            ) : (
                <Pressable onPress={() => onDeleteSlot(slot.id)} hitSlop={12} style={styles.iconButton}>
                    <Trash2 color={colors.danger} size={20} />
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    timesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        flex: 1,
    },
    iconButton: {
        padding: spacing.sm,
    },
});
