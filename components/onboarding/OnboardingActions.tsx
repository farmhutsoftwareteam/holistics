import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface OnboardingActionsProps {
    learnMoreText: string;
    buttonText: string;
    onLearnMore: () => void;
    onTakeQuiz: () => void;
    styles: any;
}

/**
 * Component for displaying the onboarding action buttons
 */
export const OnboardingActions: React.FC<OnboardingActionsProps> = ({
    learnMoreText,
    buttonText,
    onLearnMore,
    onTakeQuiz,
    styles,
}) => {
    return (
        <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={onLearnMore}>
                <Text style={styles.learnMore}>{learnMoreText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={onTakeQuiz}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
}; 