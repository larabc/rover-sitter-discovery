
import React from 'react'
import { timeStringToDate } from '../utils/timeUtils'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { Platform, Pressable, Text, StyleSheet } from 'react-native'
import { colors, spacing } from '../constants/theme'


interface TimePickerProps {
    value: string,
    onChange: (selectedDate: Date) => void,
}

export default function TimePicker({ value, onChange }: TimePickerProps) {
    if (Platform.OS === 'android') {
        return (
            <Pressable style={styles.hourInput} onPress={() => {
                DateTimePickerAndroid.open({
                    value: timeStringToDate(value),
                    mode: 'time',
                    onChange: (event, selectedDate) => {
                        if (event.type === 'set' && selectedDate) {
                            onChange(selectedDate)
                        }
                    }
                })
            }}>
                <Text>{value.split(":", 2).join(':')}</Text>
            </Pressable>
        )
    }

    return (
        <DateTimePicker
            value={timeStringToDate(value)}
            mode="time"
            display='compact'
            onChange={(event, selectedDate) => {
                if (event.type === 'set' && selectedDate) {
                    onChange(selectedDate)
                }
            }}
        />
    )
}

const styles = StyleSheet.create({
    hourInput: {
        padding: spacing.md,
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 4,
        flex: 1,
    }
});