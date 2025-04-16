import { Stack, router } from "expo-router";
import { Text, TouchableOpacity } from 'react-native';

import * as Haptics from 'expo-haptics';
import { AntDesign } from '@expo/vector-icons';
import React from "react";
import { QuizProvider, useQuizContext } from "@/context/QuizContext";
import { Platform } from 'react-native';

export default function RootLayout() {
  return (
    <QuizProvider>
      <RootLayoutNavigation />
    </QuizProvider>
  );
}

// Separate component to use context inside
function RootLayoutNavigation() {
  const { currentQuestion, setCurrentQuestion, isRejected, isSuccess } = useQuizContext();

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleQuizBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (currentQuestion === 0) {
      // If on first question, go back to home
      router.push('/');
    } else {
      // If on a later question, go back to the previous question
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Default to no header
        headerStyle: {
          backgroundColor: '#ECF0EB',
        },
        headerTitleStyle: {
          fontFamily: 'Montserrat',
          fontSize: 18,
          color: '#0B3B3C',
        },
        headerLeft: ({ canGoBack }) => {
          if (!canGoBack) return null;
          return (
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
          );
        },
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="quiz/index"
        options={{
          headerShown: !(isRejected || isSuccess), // Hide header when rejection or success screen is shown
          headerTitle: "Quiz",
          headerLeft: ({ tintColor }) => (
            <TouchableOpacity
              onPress={handleQuizBack}
              style={{
                paddingHorizontal: 20,
                height: 32,
                justifyContent: 'center',
              }}
            >
              <AntDesign name="arrowleft" size={24} color="#0B3B3C" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="learn-more/index"
        options={{
          headerShown: true,
          headerTitle: "What can we help with",
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}
