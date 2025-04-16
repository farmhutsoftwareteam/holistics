import quizData from "@/data/quiz.json";

export interface Option {
  display: string;
  value: string | boolean;
  isRejection: boolean;
}

export interface Question {
  question: string;
  type: "ChoiceTypeImage" | "ChoiceTypeText";
  options: Option[];
}

/**
 * Service class for handling quiz business logic
 */
export class QuizService {
  /**
   * Get all quiz questions from the data source
   */
  static getQuestions(): Question[] {
    return quizData.questions as Question[];
  }

  /**
   * Get a specific question by index
   * @param index The index of the question to retrieve
   */
  static getQuestion(index: number): Question | null {
    const questions = this.getQuestions();
    if (index >= 0 && index < questions.length) {
      return questions[index];
    }
    return null;
  }

  /**
   * Check if an option selected by the user results in rejection
   * @param questionIndex The index of the current question
   * @param optionIndex The index of the selected option
   */
  static isRejectionOption(
    questionIndex: number,
    optionIndex: number
  ): boolean {
    const question = this.getQuestion(questionIndex);
    if (
      !question ||
      optionIndex === null ||
      optionIndex < 0 ||
      optionIndex >= question.options.length
    ) {
      return false;
    }
    return question.options[optionIndex].isRejection;
  }

  /**
   * Get the total number of questions in the quiz
   */
  static getTotalQuestions(): number {
    return this.getQuestions().length;
  }

  /**
   * Check if the current question is the last one
   * @param currentIndex The index of the current question
   */
  static isLastQuestion(currentIndex: number): boolean {
    return currentIndex === this.getTotalQuestions() - 1;
  }

  /**
   * Process the selected answer and determine the next state
   * @param currentQuestionIndex The current question index
   * @param selectedOptionIndex The selected option index
   * @param currentAnswers The current array of answers
   */
  static processAnswer(
    currentQuestionIndex: number,
    selectedOptionIndex: number,
    currentAnswers: (string | boolean)[]
  ): {
    isRejection: boolean;
    isComplete: boolean;
    nextQuestionIndex: number;
    updatedAnswers: (string | boolean)[];
  } {
    // Get the current question
    const question = this.getQuestion(currentQuestionIndex);
    if (!question || selectedOptionIndex === null) {
      return {
        isRejection: false,
        isComplete: false,
        nextQuestionIndex: currentQuestionIndex,
        updatedAnswers: currentAnswers,
      };
    }

    // Get the selected option
    const option = question.options[selectedOptionIndex];
    const updatedAnswers = [...currentAnswers, option.value];

    // Check if this is a rejection option
    if (option.isRejection) {
      return {
        isRejection: true,
        isComplete: false,
        nextQuestionIndex: currentQuestionIndex,
        updatedAnswers,
      };
    }

    // Check if this is the last question
    if (this.isLastQuestion(currentQuestionIndex)) {
      return {
        isRejection: false,
        isComplete: true,
        nextQuestionIndex: currentQuestionIndex,
        updatedAnswers,
      };
    }

    // Move to the next question
    return {
      isRejection: false,
      isComplete: false,
      nextQuestionIndex: currentQuestionIndex + 1,
      updatedAnswers,
    };
  }
}
