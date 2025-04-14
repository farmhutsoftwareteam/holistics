import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { Image } from 'expo-image';
import learnMoreData from '../../data/learnMore.json';

const { width } = Dimensions.get('window');

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
        return index === 0
            ? "https://res.cloudinary.com/dmaj8ih7p/image/upload/v1744626810/hair-loss-info-illustration_3x_skogop.png"
            : "https://res.cloudinary.com/dmaj8ih7p/image/upload/v1744626962/erectile-dysfunction-info-illustration_3x_p0u37i.png";
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        // Determine conditional styles based on index
        const isEvenIndex = index % 2 === 0;
        const imageStyle = isEvenIndex ? { left: 10 } : { right: 10 };
        const numberStyle = isEvenIndex ? { right: 1 } : { left: 1 };

        return (
            <View style={styles.slide}>
                <View style={styles.heroContainer}>
                    <Text style={[styles.bigNumber, numberStyle]}>
                        {String(index + 1).padStart(2, '0')}
                    </Text>
                    <Image
                        style={[styles.heroImage, imageStyle]}
                        source={getImageSource(index)}
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
        alignItems: 'center',
    },
    flatList: {
        flex: 1,
    },
    slide: {
        width: width,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
    },
    heroContainer: {
        width: '100%',
        height: 220,
        position: 'relative',
        justifyContent: 'center',
    },
    image: {
        // old image style removed
    },
    heroImage: {
        width: 200,
        height: 220,
        borderRadius: 15,
        position: 'absolute',
        top: 0,
        zIndex: 2,
        backgroundColor: '#8FA086',
    },
    bigNumber: {
        fontSize: 180,
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Bold',
        position: 'absolute',
        top: 10,
        zIndex: 1,
        letterSpacing: -3.2,
    },
    textContainer: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'flex-start',
    },
    categoryHeader: {
        fontSize: 12,
        color: '#6D8A83',
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        color: '#0B3B3C',
        fontFamily: 'Montserrat-Bold',
        textAlign: 'left',
        marginBottom: 10,
        lineHeight: 34,
    },
    subtitle: {
        fontSize: 16,
        color: '#0B3B3C',
        fontFamily: 'Montserrat',
        textAlign: 'left',
        lineHeight: 24,
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
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
    },
});