import React from 'react';
import { View } from 'react-native';

interface PaginationProps {
    total: number;
    currentIndex: number;
    styles: any;
}

/**
 * Component for rendering pagination dots
 */
export const Pagination: React.FC<PaginationProps> = ({
    total,
    currentIndex,
    styles,
}) => {
    return (
        <View style={styles.dotsContainer}>
            {Array.from({ length: total }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        index === currentIndex && styles.activeDot,
                    ]}
                />
            ))}
        </View>
    );
}; 