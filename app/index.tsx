import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Onboarding } from '@/components/onboarding/Onboarding';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

export default function App() {
    const { isWeb } = useResponsiveLayout();

    return (
        <View style={[
            styles.container,
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
        backgroundColor: '#A5B79F',
    },
});
