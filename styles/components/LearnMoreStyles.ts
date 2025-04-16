import { StyleSheet } from "react-native";

/**
 * Creates dynamic styles for the learn more screens based on device metrics
 * @param isDesktop Whether the device is in desktop mode
 * @param containerWidth The container width from responsive layout
 * @param slideWidth The width of each slide
 */
export const createLearnMoreStyles = (
  isDesktop: boolean,
  containerWidth: number,
  slideWidth: number
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ECF0EB",
    },
    content: {
      flex: 1,
      alignItems: "center",
    },
    flatList: {
      flex: 1,
      width: "100%",
    },
    slide: {
      alignItems: "flex-start",
      paddingHorizontal: isDesktop ? 40 : 20,
      position: "relative",
      flex: 1,
      justifyContent: "center",
      width: slideWidth,
      ...(isDesktop && {
        alignItems: "center",
      }),
    },
    heroContainer: {
      width: "100%",
      height: isDesktop ? 280 : 220,
      position: "relative",
      justifyContent: "center",
      ...(isDesktop && {
        maxWidth: 800,
      }),
    },
    heroImage: {
      width: isDesktop ? 260 : 200,
      height: isDesktop ? 280 : 220,
      borderRadius: 15,
      position: "absolute",
      top: 0,
      zIndex: 2,
      backgroundColor: "#8FA086",
    },
    imageLeft: {
      left: 10,
    },
    imageRight: {
      right: 1,
    },
    bigNumber: {
      fontSize: isDesktop ? 220 : 180,
      color: "#FFFFFF",
      fontFamily: "Montserrat-Bold",
      position: "absolute",
      top: 10,
      zIndex: 1,
      letterSpacing: -3.2,
    },
    numberLeft: {
      left: 1,
    },
    numberRight: {
      right: 1,
    },
    textContainer: {
      marginTop: isDesktop ? 40 : 20,
      width: "100%",
      paddingHorizontal: 20,
      alignItems: "flex-start",
      ...(isDesktop && {
        maxWidth: 800,
      }),
    },
    categoryHeader: {
      fontSize: 12,
      color: "#6D8A83",
      fontFamily: "Montserrat-Bold",
      letterSpacing: 1.5,
      textTransform: "uppercase",
      marginBottom: 10,
    },
    title: {
      fontSize: isDesktop ? 32 : 26,
      color: "#0B3B3C",
      fontFamily: "Montserrat-Bold",
      textAlign: "left",
      marginBottom: 10,
      lineHeight: isDesktop ? 40 : 34,
    },
    subtitle: {
      fontSize: isDesktop ? 18 : 16,
      color: "#0B3B3C",
      fontFamily: "Montserrat",
      textAlign: "left",
      lineHeight: isDesktop ? 28 : 24,
      ...(isDesktop && {
        maxWidth: "80%",
      }),
    },
    dotsContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#0B3B3C",
      opacity: 0.3,
      marginHorizontal: 4,
    },
    activeDot: {
      opacity: 1,
    },
    button: {
      backgroundColor: "#0B3B3C",
      paddingVertical: isDesktop ? 20 : 16,
      paddingHorizontal: 32,
      borderRadius: 100,
      width: isDesktop ? Math.min(400, containerWidth * 0.5) : "90%",
      marginBottom: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontFamily: "Montserrat-SemiBold",
      fontSize: isDesktop ? 20 : 18,
    },
  });
};
