import { View, Text } from 'react-native'
import React from 'react'
import { AvailabilitySlot } from '../types/availability'
import DateTimePicker from '@react-native-community/datetimepicker'

interface SlotRowProps {
    slot: AvailabilitySlot
}

export default function SlotRow({ slot }: SlotRowProps) {

    const timeStringToDate = (timeString: string): Date => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        date.setSeconds(0);
        return date;
    }

    return (
        <View>
            <DateTimePicker
                value={timeStringToDate(slot.start_time)}
                mode="time"
                onChange={(event, selectedDate) => { }}
            />
            <DateTimePicker
                value={timeStringToDate(slot.end_time)}
                mode="time"
                onChange={(event, selectedDate) => { }}
            />
        </View>
    )
}