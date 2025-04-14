import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { Image } from 'expo-image';
import learnMoreData from '../../data/learnMore.json';

const { width } = Dimensions.get('window');

const IMAGES = {
    hairLoss: "https://res.cloudinary.com/dmaj8ih7p/image/upload/v1744626810/hair-loss-info-illustration_3x_skogop.png",
    erectileDysfunction: "https://res.cloudinary.com/dmaj8ih7p/image/upload/v1744626962/erectile-dysfunction-info-illustration_3x_p0u37i.png"
};

export default function LearnMore() {
    const [currentScreen, setCurrentScreen] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const data = learnMoreData.data;

    const handleNext = () => {
        if (currentScreen < data.length - 1) {
            setCurrentScreen(currentScreen + 1);
            flatListRef.current?.scrollToIndex({
                index: currentScreen + 1,
                animated: true
            });
        }
    };

    const getImageSource = (index: number) => {
        return index === 0 ? IMAGES.hairLoss : IMAGES.erectileDysfunction;
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <View style={styles.slide}>
            <View style={styles.mainContent}>
                <View style={[
                    styles.imageContainer,
                    index === 1 && styles.imageContainerRight
                ]}>
                    <View style={styles.imageWrapper}>
                        <Image
                            style={styles.image}
                            source={getImageSource(index)}
                            contentFit="cover"
                            transition={200}
                        />
                        <Text style={[
                            styles.bigNumber,
                            index === 0 ? styles.numberRight : styles.numberLeft
                        ]}>
                            {String(index + 1).padStart(2, '0')}
                        </Text>
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.categoryHeader}>{item.header}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
            </View>
        </View>
    );

    const handleScroll = (event: any) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        if (newIndex !== currentScreen) {
            setCurrentScreen(newIndex);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    style={styles.flatList}
                    keyExtractor={(item) => item.id.toString()}
                />

                <View style={styles.footer}>
                    {/* Progress Dots */}
                    <View style={styles.dotsContainer}>
                        {data.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index === currentScreen && styles.activeDot,
                                ]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleNext}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            {currentScreen === data.length - 1 ? 'DONE' : 'NEXT'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0EB',
    },
    content: {
        flex: 1,
    },
    flatList: {
        flex: 1,
    },
    slide: {
        width: width,
        flex: 1,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    imageContainer: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    imageContainerRight: {
        alignItems: 'flex-end',
    },
    imageWrapper: {
        position: 'relative',
        width: width * 0.45,
    },
    image: {
        width: width * 0.45,
        height: width * 0.45,
        borderRadius: 12,
        backgroundColor: '#8FA086',
    },
    bigNumber: {
        fontSize: 140,
        color: '#FFFFFF',
        opacity: 0.5,
        fontFamily: 'Roboto-Bold',
        position: 'absolute',
        top: -20,
        zIndex: 1,
    },
    numberRight: {
        right: -width * 0.15,
    },
    numberLeft: {
        left: -width * 0.15,
    },
    textContainer: {
        alignItems: 'flex-start',
        marginTop: 20,
    },
    categoryHeader: {
        fontSize: 14,
        color: '#0B3B3C',
        fontFamily: 'Roboto-Bold',
        letterSpacing: 1,
        marginBottom: 10,
        textAlign: 'left',
    },
    title: {
        fontSize: 24,
        color: '#0B3B3C',
        fontFamily: 'Roboto-Bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 16,
        color: '#0B3B3C',
        fontFamily: 'Roboto-Regular',
        lineHeight: 24,
        textAlign: 'left',
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#0B3B3C',
        opacity: 0.3,
        marginHorizontal: 4,
    },
    activeDot: {
        opacity: 1,
    },
    button: {
        backgroundColor: '#0B3B3C',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 100,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        textAlign: 'center',
    },
});
