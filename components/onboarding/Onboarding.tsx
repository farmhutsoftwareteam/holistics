import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Logo } from './Logo';
import { useFonts } from '../../hooks/useFonts';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';


export const Onboarding: React.FC = () => {
    const { fontsLoaded, onLayoutRootView } = useFonts();
    const { width, height } = useWindowDimensions();
    

    // Calculate responsive font size based on screen dimensions
    const baseFontSize = Math.min(width * 0.15, height * 0.1); // Adjust these multipliers as needed
    const subtitleFontSize = baseFontSize * 0.25; // 25% of main text size
    const lineHeight = baseFontSize * 1.14; // Maintain the same ratio
    const letterSpacing = baseFontSize * -0.03; // -3% of font size

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        // TODO: Navigate to quiz
    };

    const handleLearnMore = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push('/learn-more');
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.content}>
                <Logo size={width * 0.3} />
                <View style={styles.textContainer}>
                    <Text style={[styles.text, { fontSize: baseFontSize, lineHeight, letterSpacing }]}>
                        Be good
                    </Text>
                    <Text style={[styles.text, { fontSize: baseFontSize, lineHeight, letterSpacing }]}>
                        to yourself
                    </Text>
                    <Text style={[styles.subtitle, { fontSize: subtitleFontSize }]}>
                        We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.
                    </Text>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={handleLearnMore}>
                        <Text style={styles.learnMore}>Learn more</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlePress}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Take the quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 40,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        color: '#0B3B3C',
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
    },
    subtitle: {
        color: '#0B3B3C',
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        marginTop: 20,
        maxWidth: '80%',
        lineHeight: 24,
    },
    bottomContainer: {
        width: '100%',
        alignItems: 'center',
    },
    learnMore: {
        color: '#0B3B3C',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#7E0707',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
    },
}); 