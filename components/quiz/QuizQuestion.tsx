import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Question, Option } from '@/services/QuizService';
import { QuizOption } from './QuizOption';

interface QuizQuestionProps {
    question: Question;
    selectedIdx: number | null;
    onSelect: (option: Option, index: number) => void;
    onNext: () => void;
    styles: any;
}

/**
 * Component for rendering a quiz question with options
 */
export const QuizQuestion: React.FC<QuizQuestionProps> = ({
    question,
    selectedIdx,
    onSelect,
    onNext,
    styles,
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    style={{ width: '100%' }}
                >
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>{question.question}</Text>
                    </View>
                    <View style={styles.optionsContainer}>
                        {question.type === 'ChoiceTypeImage' ? (
                            <>
                                <View style={styles.imageRow}>
                                    {question.options.slice(0, 3).map((option, idx) => (
                                        <QuizOption
                                            key={idx}
                                            option={option}
                                            index={idx}
                                            isSelected={selectedIdx === idx}
                                            type={question.type}
                                            onSelect={onSelect}
                                            styles={styles}
                                        />
                                    ))}
                                </View>
                                <View style={styles.imageRow}>
                                    {question.options.slice(3, 6).map((option, idx) => (
                                        <QuizOption
                                            key={idx + 3}
                                            option={option}
                                            index={idx + 3}
                                            isSelected={selectedIdx === idx + 3}
                                            type={question.type}
                                            onSelect={onSelect}
                                            styles={styles}
                                        />
                                    ))}
                                </View>
                            </>
                        ) : (
                            question.options.map((option, idx) => (
                                <QuizOption
                                    key={idx}
                                    option={option}
                                    index={idx}
                                    isSelected={selectedIdx === idx}
                                    type={question.type}
                                    onSelect={onSelect}
                                    styles={styles}
                                />
                            ))
                        )}
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={[
                        styles.button,
                        { opacity: selectedIdx === null ? 0.5 : 1 }
                    ]}
                    onPress={onNext}
                    activeOpacity={0.8}
                    disabled={selectedIdx === null}
                >
                    <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}; 