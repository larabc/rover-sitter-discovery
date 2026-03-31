import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { AvailabilitySlot } from '../types/availability'
import DateTimePicker from '@react-native-community/datetimepicker'
import { CirclePlus, Ban } from 'lucide-react-native'
import { colors, spacing } from '../constants/theme'
import { timeStringToDate } from '../utils/timeUtils'

interface SlotRowProps {
    slot: AvailabilitySlot,
    onDeleteSlot: (id: number) => void,
    onAddSlot: () => void,
    onUpdateSlot: (slot: AvailabilitySlot, time: string, selectedTime?: Date) => void,
}

export default function SlotRow({ slot, onDeleteSlot, onAddSlot, onUpdateSlot }: SlotRowProps) {

    return (
        <View style={styles.container}>
            <View style={styles.slotContainer}>
                <DateTimePicker
                    value={timeStringToDate(slot.start_time)}
                    mode="time"
                    onChange={(event, selectedTime) => {
                        if (event.type === 'set') {
                            onUpdateSlot(slot, 'start_time', selectedTime)
                        }
                    }
                    }
                />
                <DateTimePicker
                    value={timeStringToDate(slot.end_time)}
                    mode="time"

                    onChange={(event, selectedTime) => {
                        if (event.type === 'set') {
                            onUpdateSlot(slot, 'end_time', selectedTime)
                        }
                    }
                    } />
            </View>
            <View style={styles.btnsContainer}>
                <Pressable onPress={() => onDeleteSlot(slot.id)}>
                    <Ban />
                </Pressable>
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
    },
    btnsContainer: {
        gap: spacing.sm,
        flexDirection: 'row',
    }
});