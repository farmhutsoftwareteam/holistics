import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of our context data
interface QuizContextType {
    currentQuestion: number;
    setCurrentQuestion: (questionIndex: number) => void;
    isRejected: boolean;
    setRejected: (rejected: boolean) => void;
    isSuccess: boolean;
    setSuccess: (success: boolean) => void;
    resetQuizState: () => void;
}

// Create the context with default values
export const QuizContext = createContext<QuizContextType>({
    currentQuestion: 0,
    setCurrentQuestion: () => { },
    isRejected: false,
    setRejected: () => { },
    isSuccess: false,
    setSuccess: () => { },
    resetQuizState: () => { },
});

// Props for the provider component
interface QuizProviderProps {
    children: ReactNode;
}

/**
 * Provider component for quiz state management
 * Handles the current question index across components
 */
export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
    const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
    const [isRejected, setIsRejected] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Function to reset all quiz state
    const resetQuizState = () => {
        setCurrentQuizQuestion(0);
        setIsRejected(false);
        setIsSuccess(false);
    };

    // Create the value object with the current state and setters
    const value = {
        currentQuestion: currentQuizQuestion,
        setCurrentQuestion: setCurrentQuizQuestion,
        isRejected,
        setRejected: setIsRejected,
        isSuccess,
        setSuccess: setIsSuccess,
        resetQuizState,
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

// Custom hook for easier context consumption
export const useQuizContext = () => {
    const context = React.useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuizContext must be used within a QuizProvider');
    }
    return context;
}; 