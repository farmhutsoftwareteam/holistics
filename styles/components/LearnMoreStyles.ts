import { StyleSheet } from "react-native";

/**
 * Creates dynamic styles for the learn more screens based on device metrics
 * @param isDesktop Whether the device is in desktop mode
 * @param containerWidth The container width from responsive layout
 * @param slideWidth The width of each slide
 *
 * !!! IMPORTANT !!!
 * REFERENCE IMPLEMENTATION:
 * The configuration for Slide 1 (index 0) with the "01" number and left-aligned image
 * is the reference design. It has been carefully positioned to create a specific visual effect
 * where a small part of the "0" appears behind the image.
 *
 * DO NOT MODIFY:
 * - heroImage + imageLeft positioning
 * - bigNumber + numberLeft positioning and z-index
 * - The 30px left margin on numberLeft
 *
 * All future changes to other slides should maintain visual consistency with Slide 1.
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
      flex: 1,
      width: slideWidth,
      justifyContent: "center",
      position: "relative",
      ...(isDesktop && {
        maxWidth: 800,
      }),
    },
    topContainer: {
      flex: 1,
      height: "50%",
      paddingHorizontal: isDesktop ? 16 : 12,
      position: "relative",
      paddingBottom: 0,
      justifyContent: "flex-end",
    },
    bottomContainer: {
      flex: 1,
      height: "50%",
      paddingHorizontal: isDesktop ? 16 : 12,
      justifyContent: "flex-start",
      paddingTop: 10,
    },
    mediaWrapper: {
      width: "100%",
      height: "95%",
      position: "relative",
    },
    heroImage: {
      width: isDesktop ? 234 : 180,
      height: isDesktop ? 252 : 198,
      borderRadius: 15,
      backgroundColor: "#8FA086",
      zIndex: 5, // REFERENCE: Must be higher than bigNumber z-index
      position: "absolute",
      top: "50%",
    },
    imageLeft: {
      left: 0, // REFERENCE: Do not modify - slide 1 reference position
      transform: [{ translateY: isDesktop ? -126 : -99 }],
    },
    imageRight: {
      right: 0,
      transform: [{ translateY: isDesktop ? -126 : -99 }],
    },
    bigNumber: {
      fontSize: isDesktop ? 140 : 120,
      color: "#FFFFFF",
      fontFamily: "Montserrat-Bold",
      letterSpacing: -3.2,
      zIndex: 1, // REFERENCE: Must be lower than heroImage z-index
      position: "absolute",
      width: "100%",
      textAlign: "center",
    },
    numberLeft: {
      // REFERENCE IMPLEMENTATION - DO NOT MODIFY
      top: "50%", // Moved from bigNumber to separate styles
      transform: [{ translateY: isDesktop ? -70 : -60 }], // Adjusted to better center with image
      marginLeft: 30, // REFERENCE: Do not modify - creates specific overlap with image in slide 1
    },
    numberRight: {
      // Slide 2 number styles - can be modified independently
      top: "50%", // Same as image top position for vertical centering
      transform: [{ translateY: isDesktop ? -60 : -50 }], // Same as numberLeft for consistent vertical centering
      marginRight: 250, // Significantly increased to create a dramatic visual shift left
    },
    categoryHeader: {
      fontSize: 12,
      color: "#6D8A83",
      fontFamily: "Montserrat-Bold",
      letterSpacing: 1.5,
      textTransform: "uppercase",
      marginTop: 0,
      marginBottom: 6,
    },
    title: {
      fontSize: isDesktop ? 32 : 26,
      color: "#0B3B3C",
      fontFamily: "Montserrat-Bold",
      textAlign: "left",
      marginBottom: 6,
      lineHeight: isDesktop ? 40 : 34,
    },
    subtitle: {
      fontSize: isDesktop ? 18 : 16,
      color: "#0B3B3C",
      fontFamily: "Montserrat",
      textAlign: "left",
      lineHeight: isDesktop ? 28 : 24,
      ...(isDesktop && {
        maxWidth: "85%",
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
