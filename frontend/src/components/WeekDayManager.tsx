import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AvailabilitySlot } from '../types/availability'
import { colors, spacing, textSizes } from '../../src/constants/theme';
import SlotRow from '../../src/components/SlotRow';

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
            <View>
                {
                    slots && slots.length > 0 ? (
                        slots.map(slot =>
                            <SlotRow key={slot.id} slot={slot} />
                        )

                    ) : (
                        <Text>Unavailable</Text>
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});