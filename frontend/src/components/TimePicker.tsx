
import React from 'react'
import { timeStringToDate } from '../utils/timeUtils'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { Platform, Pressable, Text, StyleSheet, View } from 'react-native'
import { colors, spacing } from '../constants/theme'


interface TimePickerProps {
    value: string,
    onChange: (selectedDate: Date) => void,
    disabled?: boolean
}

export default function TimePicker({ value, onChange, disabled }: TimePickerProps) {
    if (Platform.OS === 'android') {
        return (
            <Pressable disabled={disabled} style={[styles.hourInput, disabled && styles.disabled]} onPress={() => {
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
        <View style={disabled && { opacity: 0.4 }}>
            <DateTimePicker
                value={timeStringToDate(value)}
                mode="time"
                display='compact'
                disabled={disabled}
                onChange={(event, selectedDate) => {
                    if (event.type === 'set' && selectedDate) {
                        onChange(selectedDate)
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    hourInput: {
        padding: spacing.md,
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 4,
        flex: 1,
    },
    disabled: {
        opacity: 0.4,
    }
});