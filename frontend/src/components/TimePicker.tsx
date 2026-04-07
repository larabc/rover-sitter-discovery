import React, { useState } from 'react'
import { timeStringToDate } from '../utils/timeUtils'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { Platform, Pressable, Text, StyleSheet, View, Modal } from 'react-native'
import { colors, spacing, textSizes } from '../constants/theme'

interface TimePickerProps {
    value: string,
    onChange: (selectedDate: Date) => void,
    disabled?: boolean
}

export default function TimePicker({ value, onChange, disabled }: TimePickerProps) {
    const [showPicker, setShowPicker] = useState(false)

    const displayValue = value.split(":", 2).join(':')

    const handlePress = () => {
        if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
                value: timeStringToDate(value),
                mode: 'time',
                minuteInterval: 30,
                onChange: (event, selectedDate) => {
                    if (event.type === 'set' && selectedDate) {
                        onChange(selectedDate)
                    }
                }
            })
        } else {
            setShowPicker(true)
        }
    }

    return (
        <>
            <Pressable
                disabled={disabled}
                style={[styles.hourInput, disabled && styles.disabled]}
                onPress={handlePress}
            >
                <Text style={styles.timeText}>{displayValue}</Text>
            </Pressable>

            {Platform.OS === 'ios' && showPicker && (
                <Modal transparent animationType="fade">
                    <Pressable style={styles.overlay} onPress={() => setShowPicker(false)}>
                        <View style={styles.pickerContainer}>
                            <DateTimePicker
                                value={timeStringToDate(value)}
                                mode="time"
                                display="spinner"
                                minuteInterval={30}
                                onChange={(event, selectedDate) => {
                                    if (event.type === 'set' && selectedDate) {
                                        onChange(selectedDate)
                                    }
                                    setShowPicker(false)
                                }}
                            />
                        </View>
                    </Pressable>
                </Modal>
            )}
        </>
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
    },
    timeText: {
        color: colors.primary,
        fontSize: textSizes.paragraph,
    },
    overlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'flex-end',
    },
    pickerContainer: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        alignItems: 'center',
        padding: spacing.lg,
    },
});