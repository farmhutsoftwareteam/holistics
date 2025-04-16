import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { LearnMoreItem, LearnMoreService } from '@/services/LearnMoreService';

interface LearnMoreSlideProps {
    item: LearnMoreItem;
    index: number;
    styles: any;
}

/**
 * Component for rendering an individual learn more slide
 */
export const LearnMoreSlide: React.FC<LearnMoreSlideProps> = ({
    item,
    index,
    styles,
}) => {
    // Determine conditional styles based on index
    const isEvenIndex = index % 2 === 0;

    return (
        <View style={styles.slide}>
            <View style={styles.heroContainer}>
                <Text
                    style={[
                        styles.bigNumber,
                        isEvenIndex ? styles.numberRight : styles.numberLeft,
                    ]}
                >
                    {String(index + 1).padStart(2, '0')}
                </Text>
                <Image
                    style={[
                        styles.heroImage,
                        isEvenIndex ? styles.imageLeft : styles.imageRight,
                    ]}
                    source={LearnMoreService.getImageSource(index)}
                    contentFit="cover"
                    transition={200}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.categoryHeader}>{item.header}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
        </View>
    );
}; 