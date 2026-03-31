import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import BASE_URL from '../../src/api/client'
import { Sitter } from '../../src/types/Sitter'
import CustomButton from '../../src/components/CustomButton'
import { colors, layoutStyles, textStyles } from '../../src/constants/theme'
import SitterCard from '../../src/components/SitterCard'

export default function Sitters() {
    const { date, start_time, end_time } = useLocalSearchParams()

    const [sitters, setSitters] = useState<Sitter[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchSitters() {
            try {
                setIsLoading(true)
                const response = await fetch(`${BASE_URL}/sitters/search/?date=${date}&start_time=${start_time}&end_time=${end_time}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                if (response.ok) {
                    const availability_sitters = await response.json()
                    setSitters(availability_sitters)
                    console.log(availability_sitters)
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
                //TODO: define error 
                console.error(error)
            }
        }
        fetchSitters()
    }, [])

    return (
        <View style={layoutStyles.generalContainer}>
            {/* TODO: Extract back button */}
            <CustomButton label="Back" onPressFn={() => router.back()} accesibilityLabel='Button for going back to home page' />
            <View style={styles.contentContainer}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.accent} />
                    </View>
                ) :

                    sitters.length > 0 ? (
                        sitters.map((sitter) => (
                            <SitterCard key={sitter.id} sitter={sitter} />
                        ))
                    ) : (
                        <Text style={textStyles.sectionHeader}>No sitters available</Text>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
