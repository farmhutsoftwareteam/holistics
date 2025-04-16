import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

interface QuizResultProps {
    isRejection: boolean;
    onGoHome: () => void;
    styles: any;
}

/**
 * Reusable component for displaying quiz results
 * Handles both success and rejection scenarios
 */
export const QuizResult: React.FC<QuizResultProps> = ({
    isRejection,
    onGoHome,
    styles,
}) => {
    const handleOpenWebsite = async () => {
        if (Platform.OS === 'web') {
            window.open('https://www.manual.co', '_blank');
        } else {
            await WebBrowser.openBrowserAsync('https://www.manual.co');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        { justifyContent: 'center' },
                    ]}
                    style={{ width: '100%' }}
                >
                    {isRejection ? (
                        <Text style={styles.resultText}>
                            Unfortunately, we are unable to prescribe this medication for you. This
                            is because finasteride can alter the PSA levels, which may be used to monitor for
                            cancer. You should discuss this further with your GP or specialist if you would still like
                            this medication.
                        </Text>
                    ) : (
                        <Text style={styles.resultText}>
                            Great news! We have the perfect treatment for your
                            hair loss. Proceed to{' '}
                            <Text
                                style={styles.websiteLink}
                                onPress={handleOpenWebsite}
                            >
                                www.manual.co
                            </Text>
                            , and prepare to say hello to your new hair!
                        </Text>
                    )}
                </ScrollView>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onGoHome}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}; 