import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors, layoutStyles } from '../constants/theme'
import LottieView from 'lottie-react-native'

interface LoaderProps {
    height?: number
}

export default function Loader({ height }: LoaderProps) {
    return (
        <View style={[layoutStyles.loadingContainer, { minHeight: height }]}>

            <LottieView
                source={require('../../assets/loader_cat.json')}
                autoPlay
                loop
                style={{ width: 120, height: 120 }}
            />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: colors.disabled,
    }
})