import React, { useState, useRef } from 'react';
import { View, Dimensions, SafeAreaView, FlatList, Platform } from 'react-native';
import { router } from 'expo-router';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { LearnMoreService } from '@/services/LearnMoreService';
import { createLearnMoreStyles } from '@/styles/components/LearnMoreStyles';
import { LearnMoreSlide } from '@/components/learnMore/LearnMoreSlide';
import { Pagination } from '@/components/learnMore/Pagination';
import { ActionButton } from '@/components/learnMore/ActionButton';

const { width } = Dimensions.get('window');

/**
 * Main learn more screen component
 */
export default function LearnMore() {
    // State and refs
    const [currentScreen, setCurrentScreen] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    // Get data and responsive values
    const items = LearnMoreService.getItems();
    const { isWeb, isDesktop, containerWidth } = useResponsiveLayout();

    // Use window width directly for web to ensure proper slide sizing
    const slideWidth = isWeb ? width : (isDesktop ? containerWidth : width);

    // Create responsive styles
    const styles = createLearnMoreStyles(isDesktop, containerWidth, slideWidth);

    /**
     * Handle the next button press
     */
    const handleNext = () => {
        const { isLast, nextIndex } = LearnMoreService.getNextAction(currentScreen);

        if (isLast) {
            // If on last screen, navigate back to home
            router.back();
        } else {
            // Move to the next screen
            setCurrentScreen(nextIndex);
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true
            });
        }
    };

    /**
     * Handle scroll events to update the current screen
     */
    const handleScroll = (event: any) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
        if (newIndex !== currentScreen) {
            setCurrentScreen(newIndex);
        }
    };

    /**
     * Get the appropriate button label
     */
    const getButtonLabel = () => {
        return LearnMoreService.isLastScreen(currentScreen) ? 'DONE' : 'NEXT';
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <FlatList
                    ref={flatListRef}
                    data={items}
                    renderItem={({ item, index }) => (
                        <LearnMoreSlide
                            item={item}
                            index={index}
                            styles={styles}
                        />
                    )}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    style={styles.flatList}
                    keyExtractor={(item) => item.id.toString()}
                    snapToAlignment="center"
                    decelerationRate={Platform.OS === 'ios' ? 'fast' : 'normal'}
                    getItemLayout={(_data, index) => ({
                        length: slideWidth,
                        offset: slideWidth * index,
                        index,
                    })}
                    initialNumToRender={1}
                    maxToRenderPerBatch={2}
                    windowSize={2}
                    snapToInterval={slideWidth}
                />

                <Pagination
                    total={items.length}
                    currentIndex={currentScreen}
                    styles={styles}
                />

                <ActionButton
                    label={getButtonLabel()}
                    onPress={handleNext}
                    styles={styles}
                />
            </View>
        </SafeAreaView>
    );
}