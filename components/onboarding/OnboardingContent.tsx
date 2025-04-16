import React from 'react';
import { View, Text } from 'react-native';

interface OnboardingContentProps {
    heading1: string;
    heading2: string;
    subtitle: string;
    styles: any;
}

/**
 * Component for displaying the onboarding headings and subtitle
 */
export const OnboardingContent: React.FC<OnboardingContentProps> = ({
    heading1,
    heading2,
    subtitle,
    styles,
}) => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>{heading1}</Text>
            <Text style={styles.text}>{heading2}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
}; 