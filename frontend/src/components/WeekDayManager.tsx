import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { AvailabilitySlot } from '../types/availability'
import { colors, spacing, textSizes } from '../../src/constants/theme';
import SlotRow from '../../src/components/SlotRow';
import { CirclePlus } from 'lucide-react-native';

interface WeekDayManagerProps {
    day: string,
    slots: AvailabilitySlot[]
}
export default function WeekDayManager({ day, slots }: WeekDayManagerProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {day}
            </Text>
            <View style={styles.container}>
                {
                    slots && slots.length > 0 ? (
                        slots.map(slot =>
                            <SlotRow key={slot.id} slot={slot} />
                        )
                    ) : (
                        <View style={styles.unavailableContainer}>
                            <Text style={styles.unavailableText}>Unavailable</Text>
                            <Pressable>
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