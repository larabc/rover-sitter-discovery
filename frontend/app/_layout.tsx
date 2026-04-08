import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message';
import { colors } from '../src/constants/theme';

export default function Layout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="auto" />
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.white } }} />
                <Toast />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}