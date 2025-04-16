import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { Option } from '@/services/QuizService';

interface QuizOptionProps {
    option: Option;
    index: number;
    isSelected: boolean;
    type: 'ChoiceTypeImage' | 'ChoiceTypeText';
    onSelect: (option: Option, index: number) => void;
    styles: {
        imageOption?: any;
        optionImage?: any;
        textOption?: any;
        optionText?: any;
        selectedOption?: any;
    };
}

/**
 * Reusable component for quiz options (both image and text types)
 */
export const QuizOption: React.FC<QuizOptionProps> = ({
    option,
    index,
    isSelected,
    type,
    onSelect,
    styles,
}) => {
    // Direct handler for selection
    const handlePress = () => {
        onSelect(option, index);
    };

    if (type === 'ChoiceTypeImage') {
        return (
            <TouchableOpacity
                style={[
                    styles.imageOption,
                    isSelected && styles.selectedOption,
                ]}
                onPress={handlePress}
                activeOpacity={0.7}
            >
                <Image
                    source={{ uri: option.display }}
                    style={styles.optionImage}
                />
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
                style={[
                    styles.textOption,
                    isSelected && styles.selectedOption,
                ]}
                onPress={handlePress}
                activeOpacity={0.7}
            >
                <Text style={styles.optionText}>{option.display}</Text>
            </TouchableOpacity>
        );
    }
}; 