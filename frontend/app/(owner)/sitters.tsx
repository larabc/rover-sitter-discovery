import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { colors, layoutStyles, textStyles } from '../../src/constants/theme'
import SitterCard from '../../src/components/SitterCard'
import { useSitters } from '../../src/hooks/useSitters'
import Header from '../../src/components/Header'
import { Frown } from 'lucide-react-native'

export default function Sitters() {
    const { sitters, isLoading, error } = useSitters()
    return (
        <View style={layoutStyles.generalContainer}>
            <Header label='Sitters' />
            <View style={styles.contentContainer}>
                {error ? (
                    <View style={layoutStyles.errorContainer}>
                        <Frown />
                        <Text>{error}</Text>
                    </View>

                ) : isLoading ? (
                    <View style={layoutStyles.loadingContainer}>
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
});
