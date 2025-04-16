import React from 'react';
import { View, SafeAreaView, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useFonts } from '../../hooks/useFonts';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { Logo } from './Logo';
import { OnboardingContent as ContentComponent } from './OnboardingContent';
import { OnboardingActions } from './OnboardingActions';
import { OnboardingService, OnboardingContent } from '../../services/OnboardingService';
import { createOnboardingStyles } from '../../styles/components/OnboardingStyles';

/**
 * Main onboarding component shown on the home screen
 */
export const Onboarding: React.FC = () => {
    // Load custom fonts
    const { fontsLoaded, onLayoutRootView } = useFonts();

    // Get window dimensions and responsive layout values
    const { width, height } = useWindowDimensions();
    const {
        isWeb,
        isDesktop,
        getResponsiveValue,
        containerWidth,
    } = useResponsiveLayout();

    // Get content from service
    const content: OnboardingContent = OnboardingService.getContent();

    // Calculate responsive values for sizing
    const { baseFontSize, subtitleFontSize, logoSize } =
        OnboardingService.calculateResponsiveValues(width, height, getResponsiveValue);

    // Create responsive styles
    const styles = createOnboardingStyles(
        isWeb,
        isDesktop,
        containerWidth,
        width,
        height,
        baseFontSize,
        subtitleFontSize,
        logoSize,
        getResponsiveValue
    );

    /**
     * Handle take quiz button press
     */
    const handleTakeQuiz = () => {
        OnboardingService.triggerHapticFeedback('medium');
        router.push('/quiz');
    };

    /**
     * Handle learn more button press
     */
    const handleLearnMore = () => {
        OnboardingService.triggerHapticFeedback('light');
        router.push('/learn-more');
    };

    // Wait for fonts to load before rendering
    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView
            style={styles.container}
            onLayout={onLayoutRootView}
        >
            <View style={styles.content}>
                {/* Logo section */}
                <View style={isDesktop ? styles.desktopLogoContainer : styles.mobileLogoContainer}>
                    <Logo size={logoSize} />
                </View>

                {/* Content section */}
                <View style={isDesktop ? styles.desktopContentContainer : styles.contentContainer}>
                    {/* Heading and subtitle */}
                    <ContentComponent
                        heading1={content.heading1}
                        heading2={content.heading2}
                        subtitle={content.subtitle}
                        styles={styles}
                    />

                    {/* Action buttons */}
                    <OnboardingActions
                        learnMoreText={content.learnMoreText}
                        buttonText={content.buttonText}
                        onLearnMore={handleLearnMore}
                        onTakeQuiz={handleTakeQuiz}
                        styles={styles}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}; 