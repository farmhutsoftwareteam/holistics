import { StyleSheet } from "react-native";


/**
 * Creates dynamic quiz styles based on device metrics
 * @param isDesktop Whether the device is in desktop mode
 * @param containerWidth The container width from responsive layout
 */
export const createQuizStyles = (
  isDesktop: boolean,
  containerWidth: number
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ECF0EB",
    },
    content: {
      flex: 1,
      alignItems: "center",
      ...(isDesktop && { maxWidth: containerWidth, alignSelf: "center" }),
    },
    scrollContent: {
      padding: 24,
      width: "100%",
      flexGrow: 1,
      justifyContent: "center",
      ...(isDesktop && { paddingHorizontal: 40 }),
    },
    questionContainer: {
      width: "100%",
      alignItems: "center",
      paddingHorizontal: 16,
      ...(isDesktop && { maxWidth: 800, alignSelf: "center" }),
    },
    question: {
      fontSize: isDesktop ? 28 : 22,
      fontWeight: "bold",
      color: "#0B3B3C",
      marginBottom: isDesktop ? 40 : 24,
      textAlign: "center",
      fontFamily: "Montserrat-Bold",
    },
    optionsContainer: {
      width: "100%",
      alignItems: "center",
      ...(isDesktop && { maxWidth: 800, alignSelf: "center" }),
    },
    imageRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: isDesktop ? 24 : 12,
    },
    imageOption: {
      marginBottom: 16,
      borderRadius: 25,
      overflow: "hidden",
      width: isDesktop ? 140 : 100,
      height: isDesktop ? 140 : 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
      marginHorizontal: isDesktop ? 12 : 6,
    },
    optionImage: {
      width: isDesktop ? 110 : 80,
      height: isDesktop ? 110 : 80,
      resizeMode: "contain",
    },
    textOption: {
      padding: isDesktop ? 20 : 16,
      backgroundColor: "transparent",
      borderRadius: 10,
      marginBottom: isDesktop ? 20 : 16,
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#A5B79F",
      ...(isDesktop && { maxWidth: 600 }),
    },
    optionText: {
      fontSize: isDesktop ? 20 : 18,
      color: "#0B3B3C",
      fontFamily: "Montserrat",
      textAlign: "center",
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
      alignSelf: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontFamily: "Montserrat-SemiBold",
      fontWeight: "600",
      fontSize: isDesktop ? 20 : 18,
    },
    selectedOption: {
      backgroundColor: "#A5B79F",
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ECF0EB",
      padding: 24,
    },
    resultText: {
      fontSize: isDesktop ? 32 : 28,
      fontWeight: "500",
      color: "#0B3B3C",
      textAlign: "left",
      lineHeight: isDesktop ? 48 : 40,
      width: "90%",
      fontFamily: "Montserrat-Medium",
      ...(isDesktop && { maxWidth: 800, alignSelf: "center" }),
    },
    websiteLink: {
      fontSize: isDesktop ? 32 : 28,
      fontWeight: "600",
      color: "#A5B79F",
      textDecorationLine: "underline",
      fontFamily: "Montserrat-SemiBold",
    },
  });
};
