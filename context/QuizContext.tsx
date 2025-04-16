import React, { createContext, useState, ReactNode } from 'react';


interface QuizContextType {
    currentQuestion: number;
    setCurrentQuestion: (questionIndex: number) => void;
    isRejected: boolean;
    setRejected: (rejected: boolean) => void;
    isSuccess: boolean;
    setSuccess: (success: boolean) => void;
    resetQuizState: () => void;
    answers: (string | boolean)[];
    setAnswers: (answers: (string | boolean)[]) => void;
    selectedIndexes: (number | null)[];
    setSelectedIndexes: (indexes: (number | null)[]) => void;
    selectedIdx: number | null;
    setSelectedIdx: (index: number | null) => void;
}


export const QuizContext = createContext<QuizContextType>({
    currentQuestion: 0,
    setCurrentQuestion: () => { },
    isRejected: false,
    setRejected: () => { },
    isSuccess: false,
    setSuccess: () => { },
    resetQuizState: () => { },
    answers: [],
    setAnswers: () => { },
    selectedIndexes: [],
    setSelectedIndexes: () => { },
    selectedIdx: null,
    setSelectedIdx: () => { },
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
    const [answers, setAnswers] = useState<(string | boolean)[]>([]);
    const [selectedIndexes, setSelectedIndexes] = useState<(number | null)[]>([]);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    // Function to reset all quiz state
    const resetQuizState = () => {
        setCurrentQuizQuestion(0);
        setIsRejected(false);
        setIsSuccess(false);
        setAnswers([]);
        setSelectedIndexes([]);
        setSelectedIdx(null);
    };

   
    const value = {
        currentQuestion: currentQuizQuestion,
        setCurrentQuestion: setCurrentQuizQuestion,
        isRejected,
        setRejected: setIsRejected,
        isSuccess,
        setSuccess: setIsSuccess,
        resetQuizState,
        answers,
        setAnswers,
        selectedIndexes,
        setSelectedIndexes,
        selectedIdx,
        setSelectedIdx,
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