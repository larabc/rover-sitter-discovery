import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message';

export default function Layout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="auto" />
                <Stack screenOptions={{ headerShown: false }} />
                <Toast />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}