import React from 'react';
import { View, Text, ScrollView } from 'react-native';
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
            {/* Top half container with image and number */}
            <View style={styles.topContainer}>
                <View style={styles.mediaWrapper}>
                    {/* For slide 1 (index 0), position image on left, number on right */}
                    {isEvenIndex ? (
                        <>
                            {/* The "01" number now positioned on the right */}
                            <View style={styles.slide1NumberContainer}>
                                <Text style={[styles.bigNumber, styles.numberLeft]}>
                                    {String(index + 1).padStart(2, '0')}
                                </Text>
                            </View>
                            <Image
                                style={[styles.heroImage, styles.imageLeft]}
                                source={LearnMoreService.getImageSource(index)}
                                contentFit="cover"
                                transition={200}
                            />
                        </>
                    ) : (
                        // Slide 2 layout remains exactly the same
                        <>
                            <View style={styles.slide2NumberContainer}>
                                <Text style={[styles.bigNumber, styles.numberRight]}>
                                    {String(index + 1).padStart(2, '0')}
                                </Text>
                            </View>
                            <Image
                                style={[styles.heroImage, styles.imageRight]}
                                source={LearnMoreService.getImageSource(index)}
                                contentFit="cover"
                                transition={200}
                            />
                        </>
                    )}
                </View>
            </View>

            {/* Bottom half container with text - now scrollable */}
            <ScrollView
                style={{
                    flex: 1,
                    height: "50%",
                    paddingHorizontal: styles.bottomContainer.paddingHorizontal
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 20,
                    paddingTop: styles.bottomContainer.paddingTop,
                    justifyContent: styles.bottomContainer.justifyContent
                }}
            >
                <Text style={styles.categoryHeader}>{item.header}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
            </ScrollView>
        </View>
    );
}; 