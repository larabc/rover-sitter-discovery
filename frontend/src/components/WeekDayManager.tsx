import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { AvailabilitySlot, DayOfWeek } from '../types/availability'
import { colors, iconSizes, spacing } from '../../src/constants/theme';
import SlotRow from '../../src/components/SlotRow';
import { CirclePlus } from 'lucide-react-native';

interface WeekDayManagerProps {
    day: number,
    slots: AvailabilitySlot[],
    onAddSlot: () => void,
    onDeleteSlot: (id: number) => void,
    onUpdateSlot: (slot: AvailabilitySlot, time: string, selectedDate?: Date) => void,
    isAddingSlot: boolean,
    loadingSlotId: null | number,
}

export default function WeekDayManager({ day, slots, onAddSlot, onDeleteSlot, onUpdateSlot, isAddingSlot, loadingSlotId }: WeekDayManagerProps) {

    const isDayLoading = isAddingSlot || slots?.some(slot => slot.id === loadingSlotId)
    const hasSlots = slots && slots.length > 0

    return (
        <View style={[styles.card, !hasSlots && !isAddingSlot && styles.cardUnavailable]}>
            <View style={styles.weekdayContainer}>
                <Text style={styles.title}>{DayOfWeek[day]}</Text>
                <Pressable onPress={onAddSlot} hitSlop={12} style={styles.iconButton}>
                    <CirclePlus color={colors.accent} size={iconSizes.medium} />
                </Pressable>
            </View>
            {hasSlots || isAddingSlot ? (
                <>
                    {slots?.map(slot => (
                        <SlotRow key={slot.id} slot={slot} onDeleteSlot={onDeleteSlot} onAddSlot={onAddSlot} onUpdateSlot={onUpdateSlot} loadingSlotId={loadingSlotId} isDisabled={isDayLoading} />
                    ))}
                    {isAddingSlot && (
                        <ActivityIndicator size="small" color={colors.accent} />
                    )}
                </>
            ) : (
                <Text style={styles.unavailableText}>Unavailable</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.lightGray,
        borderRadius: 12,
        padding: spacing.md,
        gap: spacing.sm,
    },
    cardUnavailable: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
    },
    weekdayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
    },
    unavailableText: {
        color: colors.disabled,
        fontStyle: 'italic',
        fontSize: 14,
    },
    iconButton: {
        padding: spacing.sm,
    },
});