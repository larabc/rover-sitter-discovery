import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message';
import { colors } from '../src/constants/theme';
import { useFonts, Fraunces_400Regular, Fraunces_700Bold, Fraunces_600SemiBold } from "@expo-google-fonts/fraunces";

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Fraunces_400Regular,
        Fraunces_700Bold,
        Fraunces_600SemiBold
    })

    if (!fontsLoaded) return null

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <StatusBar backgroundColor={colors.background} />
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
                <Toast topOffset={60} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}