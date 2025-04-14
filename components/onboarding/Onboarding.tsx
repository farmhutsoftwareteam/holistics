import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import { Logo } from './Logo';
import { useFonts } from '../../hooks/useFonts';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

export const Onboarding: React.FC = () => {
    const { fontsLoaded, onLayoutRootView } = useFonts();
    const { width, height } = useWindowDimensions();
    const {
        isWeb,
        isDesktop,
        getResponsiveValue,
        containerWidth,
        widthPercentage
    } = useResponsiveLayout();

    // Calculate responsive font size based on screen dimensions
    const baseFontSize = getResponsiveValue({
        base: Math.min(width * 0.15, height * 0.1),
        md: Math.min(width * 0.12, height * 0.09),
        lg: Math.min(width * 0.08, height * 0.08),
        xl: Math.min(width * 0.06, height * 0.07),
    });

    const subtitleFontSize = getResponsiveValue({
        base: baseFontSize * 0.25,
        lg: Math.max(16, baseFontSize * 0.2)
    });

    const lineHeight = baseFontSize * 1.14;
    const letterSpacing = baseFontSize * -0.03;

    // Logo size: smaller on mobile, larger on desktop but with a maximum size
    const logoSize = getResponsiveValue({
        base: width * 0.3,
        md: width * 0.25,
        lg: Math.min(width * 0.18, 250),
    });

    const handlePress = () => {
        // Only trigger haptics on native platforms
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        router.push('/quiz');
    };

    const handleLearnMore = () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        router.push('/learn-more');
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView
            style={[styles.container, isWeb && styles.webContainer]}
            onLayout={onLayoutRootView}
        >
            {/* For desktop, use a centered container with max width */}
            <View style={[
                styles.content,
                isDesktop && {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    maxWidth: containerWidth,
                    alignSelf: 'center',
                    paddingHorizontal: 40
                }
            ]}>
                {/* Left side: Logo (on desktop, or top on mobile) */}
                <View style={[
                    isDesktop ? styles.desktopLogoContainer : styles.mobileLogoContainer
                ]}>
                    <Logo size={logoSize} />
                </View>

                {/* Right side: Text and buttons (on desktop, or middle and bottom on mobile) */}
                <View style={[
                    isDesktop ? styles.desktopContentContainer : styles.contentContainer
                ]}>
                    <View style={[
                        styles.textContainer,
                        isDesktop && { alignItems: 'flex-start' }
                    ]}>
                        <Text style={[
                            styles.text,
                            { fontSize: baseFontSize, lineHeight, letterSpacing },
                            isDesktop && styles.desktopText
                        ]}>
                            Be good
                        </Text>
                        <Text style={[
                            styles.text,
                            { fontSize: baseFontSize, lineHeight, letterSpacing },
                            isDesktop && styles.desktopText
                        ]}>
                            to yourself
                        </Text>
                        <Text style={[
                            styles.subtitle,
                            { fontSize: subtitleFontSize },
                            isDesktop && styles.desktopSubtitle
                        ]}>
                            We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.
                        </Text>
                    </View>

                    <View style={[
                        styles.bottomContainer,
                        isDesktop && { width: getResponsiveValue({ base: width, lg: 400 }) }
                    ]}>
                        <TouchableOpacity onPress={handleLearnMore}>
                            <Text style={[
                                styles.learnMore,
                                isDesktop && { fontSize: 18 }
                            ]}>Learn more</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                isDesktop && { width: '100%', marginTop: 24, paddingVertical: 20 }
                            ]}
                            onPress={handlePress}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.buttonText,
                                isDesktop && { fontSize: 20 }
                            ]}>Take the quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webContainer: {
        // Center content vertically on web
        display: 'flex',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 40,
    },
    mobileLogoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    desktopLogoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 40,
    },
    contentContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
    },
    desktopContentContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        color: '#0B3B3C',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    desktopText: {
        textAlign: 'left',
    },
    subtitle: {
        color: '#0B3B3C',
        textAlign: 'center',
        fontFamily: 'Montserrat',
        marginTop: 20,
        maxWidth: '80%',
        lineHeight: 24,
    },
    desktopSubtitle: {
        textAlign: 'left',
        maxWidth: '100%',
        lineHeight: 32,
        marginBottom: 40,
    },
    bottomContainer: {
        width: '100%',
        alignItems: 'center',
    },
    learnMore: {
        color: '#0B3B3C',
        fontFamily: 'Montserrat',
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
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
    },
}); 