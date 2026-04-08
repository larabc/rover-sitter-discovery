import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { Platform, Pressable, Text, StyleSheet, View, Modal } from 'react-native'
import { colors, spacing } from '../constants/theme'

interface DatePickerProps {
    value: Date,
    onChange: (selectedDate: Date) => void,
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
    const [showPicker, setShowPicker] = useState(false)

    const handlePress = () => {
        if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
                value: value,
                mode: 'date',
                minimumDate: new Date(),
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
            <Pressable style={styles.dateInput} onPress={handlePress}>
                <Text style={styles.dateText}>{value.toDateString()}</Text>
            </Pressable>

            {Platform.OS === 'ios' && showPicker && (
                <Modal transparent animationType="fade">
                    <Pressable style={styles.overlay} onPress={() => setShowPicker(false)}>
                        <View style={styles.pickerContainer}>
                            <DateTimePicker
                                value={value}
                                mode="date"
                                display="spinner"
                                minimumDate={new Date()}

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
    dateInput: {
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 4,
        padding: spacing.md,
    },
    dateText: {
        color: colors.primary,
        fontSize: 15,
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