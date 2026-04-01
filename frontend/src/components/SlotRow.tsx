import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { AvailabilitySlot } from '../types/availability'
import DateTimePicker from '@react-native-community/datetimepicker'
import { CirclePlus, Ban, SeparatorHorizontal } from 'lucide-react-native'
import { colors, layoutStyles, spacing } from '../constants/theme'
import { timeStringToDate } from '../utils/timeUtils'
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
        <View style={styles.container}>
            <View style={styles.slotContainer}>
                <TimePicker
                    value={slot.start_time}
                    onChange={(selectedDate) => onUpdateSlot(slot, 'start_time', selectedDate)}
                    disabled={isDisabled}
                />
                <Text style={styles.separator}>-</Text>
                <TimePicker
                    value={slot.end_time}
                    onChange={(selectedDate) => onUpdateSlot(slot, 'end_time', selectedDate)}
                    disabled={isDisabled}

                />
            </View>
            <View style={styles.btnsContainer}>
                {
                    slot.id === loadingSlotId ? (
                        <ActivityIndicator size="small" color={colors.accent} />
                    ) : (
                        <Pressable onPress={() => onDeleteSlot(slot.id)}>
                            <Ban />
                        </Pressable>
                    )
                }

                <Pressable onPress={onAddSlot}>
                    <CirclePlus color={colors.accent} />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.sm
    },
    slotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        flex: 1,

    },
    btnsContainer: {
        gap: spacing.sm,
        flexDirection: 'row',
    },
    separator: {
        fontSize: 20,
        color: colors.border,
    }

});