import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useQuizContext } from '@/context/QuizContext';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { QuizService, Option } from '@/services/QuizService';
import { createQuizStyles } from '@/styles/components/QuizStyles';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';

/**
 * Main quiz screen component that handles the quiz flow
 */
export default function QuizScreen() {
    const {
        currentQuestion,
        setCurrentQuestion,
        isRejected,
        setRejected,
        isSuccess,
        setSuccess,
        resetQuizState,
        answers,
        setAnswers,
        selectedIndexes,
        setSelectedIndexes,
        selectedIdx,
        setSelectedIdx
    } = useQuizContext();

    const router = useRouter();
    const { isDesktop, containerWidth } = useResponsiveLayout();

    // Generate styles based on responsive layout
    const styles = createQuizStyles(isDesktop, containerWidth);

    // Get the current question from the quiz service
    const question = QuizService.getQuestion(currentQuestion);

    // Reset selected option when moving to a new question
    useEffect(() => {
        // If we have a previously selected index for this question, use it
        setSelectedIdx(selectedIndexes[currentQuestion] || null);
    }, [currentQuestion, selectedIndexes]);

    /**
     * Handle option selection
     */
    const handleSelect = (option: Option, idx: number) => {
        // First update the indexes array to persist the selection
        const newSelectedIndexes = [...selectedIndexes];
        newSelectedIndexes[currentQuestion] = idx;
        setSelectedIndexes(newSelectedIndexes);

        // Then update the current selection state
        // Using a slight timeout to avoid state batching issues
        setTimeout(() => {
            setSelectedIdx(idx);
        }, 0);
    };

    /**
     * Handle going back to the previous question
     */
    const handleBack = () => {
        if (currentQuestion > 0) {
            // Move to the previous question while maintaining all answers
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    /**
     * Handle the next button press
     */
    const handleNext = () => {
        if (selectedIdx === null || !question) return;

        // Process the answer using the quiz service
        const result = QuizService.processAnswer(
            currentQuestion,
            selectedIdx,
            answers
        );

        // Update the answers
        setAnswers(result.updatedAnswers);

        // Handle rejection
        if (result.isRejection) {
            setRejected(true);
            return;
        }

        // Handle completion
        if (result.isComplete) {
            setSuccess(true);
            return;
        }

        // Move to the next question
        setCurrentQuestion(result.nextQuestionIndex);
    };

    /**
     * Handle returning to home screen
     */
    const handleGoHome = () => {
        // Only reset quiz state when completing the quiz
        resetQuizState();
        router.push('/');
    };

    // Render the appropriate screen based on quiz state
    if (isRejected) {
        return (
            <QuizResult
                isRejection={true}
                onGoHome={handleGoHome}
                styles={styles}
            />
        );
    }

    if (isSuccess) {
        return (
            <QuizResult
                isRejection={false}
                onGoHome={handleGoHome}
                styles={styles}
            />
        );
    }

    // If we don't have a question (shouldn't happen), don't render anything
    if (!question) {
        return null;
    }

    // Render the quiz question
    return (
        <QuizQuestion
            question={question}
            selectedIdx={selectedIdx}
            onSelect={handleSelect}
            onNext={handleNext}
            onBack={currentQuestion > 0 ? handleBack : undefined}
            styles={styles}
        />
    );
} 