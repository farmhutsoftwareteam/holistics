import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Onboarding } from '../components/onboarding/Onboarding';

export default function App() {
    return (
        <View style={styles.container}>
            <Onboarding />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A5B79F',
    },
});
