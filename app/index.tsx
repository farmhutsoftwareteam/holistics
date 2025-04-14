import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Onboarding } from '../components/onboarding/Onboarding';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';

export default function App() {
    const { isWeb } = useResponsiveLayout();

    return (
        <View style={[
            styles.container,
            // On web, use a more subtle gradient-like background
            isWeb && styles.webContainer
        ]}>
            <Onboarding />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A5B79F',
    },
    webContainer: {
        // For web, we can use gradients for a more refined look
        backgroundColor: '#A5B79F',
        // Note: actual CSS gradients would be applied via Platform.select or a web-specific stylesheet
    },
});
