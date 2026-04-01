import { View, Text, StyleSheet } from 'react-native'
import CustomButton from '../../src/components/CustomButton'
import { router } from 'expo-router'
import { colors, spacing, textSizes } from '../../src/constants/theme'
import TimePicker from '../../src/components/TimePicker'
import { useState } from 'react'
import { dateToTimeString } from '../../src/utils/timeUtils'
import DatePicker from '../../src/components/DatePicker'
import { textStyles, layoutStyles } from '../../src/constants/theme'

export default function Search() {
    const [date, setDate] = useState(new Date())
    const [startTime, setStartTime] = useState('09:00:00') //TODO: Import this from a commons file
    const [endTime, setEndTime] = useState('18:00:00')



    return (
        <View style={layoutStyles.generalContainer}>
            <CustomButton label="Back" onPressFn={() => router.back()} accesibilityLabel='Button for going back to home page' />
            <View style={styles.contentContainer}>
                <Text style={textStyles.displayHeader}>Drop-In Visits</Text>
                <Text style={textStyles.paragraph}>When do you need a sitter?</Text>
                <View style={styles.scheduleForm}>
                    <View>
                        <Text style={textStyles.sectionHeader}>Date</Text>
                        <DatePicker value={date}
                            onChange={(selectedDate) => setDate(selectedDate)} />
                    </View>
                    <View>
                        <Text style={textStyles.sectionHeader}>Times</Text>
                        <View style={styles.slotContainer}>
                            <TimePicker
                                value={startTime}
                                onChange={(selectedDate) => setStartTime(dateToTimeString(selectedDate))}
                            />
                            <Text style={styles.separator}>-</Text>
                            <TimePicker
                                value={endTime}
                                onChange={(selectedDate) => setEndTime(dateToTimeString(selectedDate))}
                            />
                        </View>
                    </View>
                </View>
                <CustomButton label="Search" onPressFn={() => router.push({ pathname: '/(owner)/sitters', params: { date: date.toISOString().split('T')[0], start_time: startTime, end_time: endTime } })} accesibilityLabel='Button for searching sitters based on the provided parameters'></CustomButton>
            </View>
        </View>
    )
}


//TODO: Extract repeated styles 
const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scheduleForm: {
        padding: spacing.md,
        flex: 1,
        gap: spacing.lg,

    },
    slotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,

    },
    separator: {
        fontSize: 20,
        color: colors.border,
    },
})