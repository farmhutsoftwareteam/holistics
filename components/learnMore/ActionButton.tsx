import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ActionButtonProps {
    label: string;
    onPress: () => void;
    styles: any;
}

/**
 * Component for action button (Next/Done)
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
    label,
    onPress,
    styles,
}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
}; 