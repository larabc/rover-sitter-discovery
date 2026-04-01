import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors, layoutStyles } from '../constants/theme'

interface LoaderProps {
    height?: number
}

export default function Loader({ height }: LoaderProps) {
    return (
        <View style={[layoutStyles.loadingContainer, { minHeight: height }]}>
            <ActivityIndicator size="large" color={colors.accent} />
        </View>
    )
}