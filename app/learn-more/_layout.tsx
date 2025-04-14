import { Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function Layout() {
    const handleBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
    };

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#ECF0EB',
                },
                headerTitleStyle: {
                    fontFamily: 'Roboto-Regular',
                    fontSize: 18,
                    color: '#0B3B3C',
                },
                headerTitle: 'What can we help with',
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={handleBack}
                        style={{
                            paddingHorizontal: 20,
                            height: 32,
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{
                            fontSize: 32,
                            color: '#0B3B3C',
                            lineHeight: 32
                        }}>×</Text>
                    </TouchableOpacity>
                ),
                headerShadowVisible: false,
            }}
        />
    );
}