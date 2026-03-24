import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';


export default function App() {
    const router = useRouter();


    return (
        <View>
            <Text>You are a dog...</Text>
            <Button
                onPress={() => router.push('/(sitter)/availability')}
                title="Go to Sitter Role"
                accessibilityLabel="Button that goes to sitter availaibilty page"
            />
            <Button
                onPress={() => router.push('/(owner)/search')}
                title="Go to Owner Role"
                accessibilityLabel="Button that goes to owner role search page"
            />
        </View>
    )
}