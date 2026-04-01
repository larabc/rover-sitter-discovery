import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { AvailabilitySlot, DayOfWeek } from '../types/availability'
import { colors, layoutStyles, spacing, textSizes } from '../../src/constants/theme';
import SlotRow from '../../src/components/SlotRow';
import { CirclePlus } from 'lucide-react-native';

interface WeekDayManagerProps {
    day: number,
    slots: AvailabilitySlot[],
    onAddSlot: () => void,
    onDeleteSlot: (id: number) => void,
    onUpdateSlot: (slot: AvailabilitySlot, time: string, selectedDate?: Date) => void,
    isAddingSlot: boolean,
    loadingSlotId: null | number
}

export default function WeekDayManager({ day, slots, onAddSlot, onDeleteSlot, onUpdateSlot, isAddingSlot, loadingSlotId }: WeekDayManagerProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {DayOfWeek[day]}
            </Text>
            <View style={styles.container}>
                {
                    slots && slots.length > 0 ? (
                        <>
                            {slots.map(slot => (
                                < SlotRow key={slot.id} slot={slot} onDeleteSlot={onDeleteSlot} onAddSlot={onAddSlot} onUpdateSlot={onUpdateSlot} loadingSlotId={loadingSlotId} />
                            ))}
                            {isAddingSlot && (
                                <ActivityIndicator size="small" color={colors.accent} />)}
                        </>
                    ) : (
                        <View style={styles.unavailableContainer}>
                            <Text style={styles.unavailableText}>Unavailable</Text>
                            <Pressable onPress={onAddSlot}>
                                <CirclePlus color={colors.accent} />
                            </Pressable>
                        </View>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.sm
    },
    unavailableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    unavailableText: {
        color: colors.disabled
    }
});