
import React from 'react'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { Platform, Pressable, Text, StyleSheet } from 'react-native'
import { colors, spacing } from '../constants/theme'


interface DatePickerProps {
    value: Date,
    onChange: (selectedDate: Date) => void,
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
    if (Platform.OS === 'android') {
        return (
            <Pressable style={styles.hourInput} onPress={() => {
                DateTimePickerAndroid.open({
                    value: value,
                    mode: 'date',
                    onChange: (event, selectedDate) => {
                        if (event.type === 'set' && selectedDate) {
                            onChange(selectedDate)
                        }
                    }
                })
            }}>
                <Text>{value.toDateString()}</Text>
            </Pressable>
        )
    }

    return (
        <DateTimePicker
            value={value}
            mode="date"
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
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 4,
        padding: spacing.md,
    }
});