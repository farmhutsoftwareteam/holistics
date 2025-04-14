import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Linking, Platform } from 'react-native';
import quizData from '@/data/quiz.json';
import { useRouter } from 'expo-router';
import { useQuizContext } from '@/context/QuizContext';
import * as WebBrowser from 'expo-web-browser';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

interface Option {
    display: string;
    value: string | boolean;
    isRejection: boolean;
}

interface Question {
    question: string;
    type: 'ChoiceTypeImage' | 'ChoiceTypeText';
    options: Option[];
}

export default function QuizScreen() {
    const {
        currentQuestion,
        setCurrentQuestion,
        isRejected,
        setRejected,
        isSuccess,
        setSuccess,
        resetQuizState
    } = useQuizContext();
    const [current, setCurrent] = useState(currentQuestion);
    const [answers, setAnswers] = useState<(string | boolean)[]>([]);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [selectedIndexes, setSelectedIndexes] = useState<(number | null)[]>([]);
    const router = useRouter();
    const { isWeb, isDesktop, getResponsiveValue, containerWidth } = useResponsiveLayout();

    // Keep local state in sync with context
    useEffect(() => {
        setCurrent(currentQuestion);
    }, [currentQuestion]);

    // Update context when local state changes
    useEffect(() => {
        setCurrentQuestion(current);
    }, [current]);

    const questions = quizData.questions as Question[];
    const q = questions[current];

    const handleSelect = (option: Option, idx: number) => {
        setSelectedIdx(idx);

        // Update selected indexes for this question
        const newSelectedIndexes = [...selectedIndexes];
        newSelectedIndexes[current] = idx;
        setSelectedIndexes(newSelectedIndexes);
    };

    const handleOpenWebsite = async () => {
        if (Platform.OS === 'web') {
            window.open('https://www.manual.co', '_blank');
        } else {
            await WebBrowser.openBrowserAsync('https://www.manual.co');
        }
    };

    const handleNext = () => {
        if (selectedIdx === null) return;
        const option = q.options[selectedIdx];
        setAnswers([...answers, option.value]);

        // Check for rejection when Next is pressed
        if (option.isRejection) {
            setRejected(true);
            return;
        }

        if (current < questions.length - 1) {
            const nextQuestion = current + 1;
            setCurrent(nextQuestion);
            setCurrentQuestion(nextQuestion);
            setSelectedIdx(selectedIndexes[nextQuestion] || null); // Set to previously selected answer if exists
        } else {
            // We've reached the end of the questions, show success screen
            setSuccess(true);
        }
    };

    const handleGoHome = () => {
        // Reset quiz state before navigating home
        resetQuizState();
        router.push('/');
    };

    // Rejection Screen
    if (isRejected) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[
                    styles.content,
                    isDesktop && { maxWidth: containerWidth, alignSelf: 'center' }
                ]}>
                    <ScrollView
                        contentContainerStyle={[
                            styles.scrollContent,
                            { justifyContent: 'center' },
                            isDesktop && { paddingHorizontal: 40 }
                        ]}
                        style={{ width: '100%' }}
                    >
                        <Text style={[
                            styles.rejectedText,
                            isDesktop && { fontSize: 32, lineHeight: 48, maxWidth: 800, alignSelf: 'center' }
                        ]}>
                            Unfortunately, we are unable to prescribe this medication for you. This
                            is because finasteride can alter the PSA levels, which may be used to monitor for
                            cancer. You should discuss this further with your GP or specialist if you would still like
                            this medication.
                        </Text>
                    </ScrollView>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            isDesktop && {
                                width: Math.min(400, containerWidth * 0.5),
                                paddingVertical: 20
                            }
                        ]}
                        onPress={handleGoHome}
                        activeOpacity={0.8}
                    >
                        <Text style={[
                            styles.buttonText,
                            isDesktop && { fontSize: 20 }
                        ]}>OK</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Success Screen
    if (isSuccess) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[
                    styles.content,
                    isDesktop && { maxWidth: containerWidth, alignSelf: 'center' }
                ]}>
                    <ScrollView
                        contentContainerStyle={[
                            styles.scrollContent,
                            { justifyContent: 'center' },
                            isDesktop && { paddingHorizontal: 40 }
                        ]}
                        style={{ width: '100%' }}
                    >
                        <Text style={[
                            styles.successText,
                            isDesktop && { fontSize: 32, lineHeight: 48, maxWidth: 800, alignSelf: 'center' }
                        ]}>
                            Great news! We have the perfect treatment for your
                            hair loss. Proceed to{' '}
                            <Text
                                style={[
                                    styles.websiteLink,
                                    isDesktop && { fontSize: 32 }
                                ]}
                                onPress={handleOpenWebsite}
                            >
                                www.manual.co
                            </Text>
                            , and prepare to say hello to your new hair!
                        </Text>
                    </ScrollView>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            isDesktop && {
                                width: Math.min(400, containerWidth * 0.5),
                                paddingVertical: 20
                            }
                        ]}
                        onPress={handleGoHome}
                        activeOpacity={0.8}
                    >
                        <Text style={[
                            styles.buttonText,
                            isDesktop && { fontSize: 20 }
                        ]}>OK</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[
                styles.content,
                isDesktop && { maxWidth: containerWidth, alignSelf: 'center' }
            ]}>
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        isDesktop && { paddingHorizontal: 40 }
                    ]}
                    style={{ width: '100%' }}
                >
                    <View style={[
                        styles.questionContainer,
                        isDesktop && { maxWidth: 800, alignSelf: 'center' }
                    ]}>
                        <Text style={[
                            styles.question,
                            isDesktop && { fontSize: 28, marginBottom: 40 }
                        ]}>{q.question}</Text>
                    </View>
                    <View style={[
                        styles.optionsContainer,
                        isDesktop && { maxWidth: 800, alignSelf: 'center' }
                    ]}>
                        {q.type === 'ChoiceTypeImage' ? (
                            <>
                                <View style={[
                                    styles.imageRow,
                                    isDesktop && { marginBottom: 24 }
                                ]}>
                                    {q.options.slice(0, 3).map((option, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={[
                                                styles.imageOption,
                                                selectedIdx === idx && styles.selectedOption,
                                                isDesktop && {
                                                    width: 140,
                                                    height: 140,
                                                    marginHorizontal: 12
                                                }
                                            ]}
                                            onPress={() => handleSelect(option, idx)}
                                        >
                                            <Image
                                                source={{ uri: option.display }}
                                                style={[
                                                    styles.optionImage,
                                                    isDesktop && {
                                                        width: 110,
                                                        height: 110
                                                    }
                                                ]}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={[
                                    styles.imageRow,
                                    isDesktop && { marginBottom: 24 }
                                ]}>
                                    {q.options.slice(3, 6).map((option, idx) => (
                                        <TouchableOpacity
                                            key={idx + 3}
                                            style={[
                                                styles.imageOption,
                                                selectedIdx === idx + 3 && styles.selectedOption,
                                                isDesktop && {
                                                    width: 140,
                                                    height: 140,
                                                    marginHorizontal: 12
                                                }
                                            ]}
                                            onPress={() => handleSelect(option, idx + 3)}
                                        >
                                            <Image
                                                source={{ uri: option.display }}
                                                style={[
                                                    styles.optionImage,
                                                    isDesktop && {
                                                        width: 110,
                                                        height: 110
                                                    }
                                                ]}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        ) : (
                            q.options.map((option, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={[
                                        styles.textOption,
                                        selectedIdx === idx && styles.selectedOption,
                                        isDesktop && {
                                            maxWidth: 600,
                                            padding: 20,
                                            marginBottom: 20
                                        }
                                    ]}
                                    onPress={() => handleSelect(option, idx)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        isDesktop && { fontSize: 20 }
                                    ]}>{option.display}</Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={[
                        styles.button,
                        { opacity: selectedIdx === null ? 0.5 : 1 },
                        isDesktop && {
                            width: Math.min(400, containerWidth * 0.5),
                            paddingVertical: 20
                        }
                    ]}
                    onPress={handleNext}
                    activeOpacity={0.8}
                    disabled={selectedIdx === null}
                >
                    <Text style={[
                        styles.buttonText,
                        isDesktop && { fontSize: 20 }
                    ]}>NEXT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0EB',
    },
    question: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0B3B3C',
        marginBottom: 24,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    questionContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    optionsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    imageOption: {
        marginBottom: 16,
        borderRadius: 25,
        overflow: 'hidden',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: 6,
    },
    optionImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    textOption: {
        padding: 16,
        backgroundColor: 'transparent',
        borderRadius: 10,
        marginBottom: 16,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#A5B79F',
    },
    optionText: {
        fontSize: 18,
        color: '#0B3B3C',
        fontFamily: 'Montserrat',
        textAlign: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECF0EB',
        padding: 24,
    },
    rejectedText: {
        fontSize: 28,
        fontWeight: '500',
        color: '#0B3B3C',
        textAlign: 'left',
        lineHeight: 40,
        width: '90%',
        fontFamily: 'Montserrat-Medium',
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#0B3B3C',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 100,
        width: '90%',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#ECF0EB',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        fontSize: 18,
    },
    selectedOption: {
        backgroundColor: '#A5B79F',
    },
    scrollContent: {
        padding: 24,
        width: '100%',
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    successText: {
        fontSize: 28,
        fontWeight: '500',
        color: '#0B3B3C',
        textAlign: 'left',
        lineHeight: 40,
        width: '90%',
        fontFamily: 'Montserrat-Medium',
    },
    websiteLink: {
        fontSize: 28,
        fontWeight: '600',
        color: '#A5B79F',
        textDecorationLine: 'underline',
        fontFamily: 'Montserrat-SemiBold',
    },
}); 