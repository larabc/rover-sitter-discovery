import { View, Text, StyleSheet } from 'react-native'
import CustomButton from '../../src/components/CustomButton'
import { router } from 'expo-router'
import { colors, spacing } from '../../src/constants/theme'
import TimePicker from '../../src/components/TimePicker'
import { useState } from 'react'
import { toTimeString } from '../../src/utils/timeUtils'
import DatePicker from '../../src/components/DatePicker'
import { textStyles, layoutStyles } from '../../src/constants/theme'
import Header from '../../src/components/Header'
import { DEFAULT_END_TIME, DEFAULT_START_TIME } from '../../src/constants/defaults'

export default function Search() {
    const [date, setDate] = useState(new Date())
    const [startTime, setStartTime] = useState(DEFAULT_START_TIME)
    const [endTime, setEndTime] = useState(DEFAULT_END_TIME)
    const isValidSearch = startTime < endTime

    const handleSearch = () => {
        router.push({ pathname: '/(owner)/sitters', params: { date: date.toISOString().split('T')[0], start_time: startTime, end_time: endTime } })
    }

    return (
        <View style={layoutStyles.generalContainer}>
            <Header label='Drop-In Visits' />
            <View style={layoutStyles.contentContainer}>
                <View style={styles.scheduleForm}>
                    <Text style={textStyles.paragraph}>When do you need a sitter?</Text>
                    <View style={styles.fieldCard}>
                        <Text style={textStyles.sectionHeader}>Date</Text>
                        <DatePicker value={date}
                            onChange={(selectedDate) => setDate(selectedDate)} />
                    </View>
                    <View>
                        <View style={styles.fieldCard}>
                            <Text style={textStyles.sectionHeader}>Times</Text>
                            <View style={layoutStyles.slotContainer}>
                                <TimePicker
                                    value={startTime}
                                    onChange={(selectedDate) => setStartTime(toTimeString(selectedDate))}
                                />
                                <Text style={layoutStyles.separator}>-</Text>
                                <TimePicker
                                    value={endTime}
                                    onChange={(selectedDate) => setEndTime(toTimeString(selectedDate))}
                                />

                            </View>
                            {!isValidSearch && (
                                <View style={styles.errorMessage}>
                                    <Text style={textStyles.error}>Start time must be before end time</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <CustomButton label="Search" variant="filled" onPressFn={handleSearch} disabled={!isValidSearch}
                    accesibilityLabel='Button for searching sitters based on the provided parameters' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    scheduleForm: {
        padding: spacing.md,
        flex: 1,
        gap: spacing.lg,

    },
    errorMessage: {
        paddingBlock: spacing.sm
    },
    fieldCard: {
        backgroundColor: colors.lightGray,
        borderRadius: 12,
        padding: spacing.md,
        gap: spacing.sm,
    },

})