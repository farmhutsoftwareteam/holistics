import { StyleSheet } from "react-native";

/**
 * Creates dynamic styles for the onboarding screen based on device metrics
 * @param isWeb Whether the device is on web platform
 * @param isDesktop Whether the device is in desktop mode
 * @param containerWidth The container width from responsive layout
 * @param width The window width
 * @param height The window height
 * @param baseFontSize The calculated base font size
 * @param subtitleFontSize The calculated subtitle font size
 * @param logoSize The calculated logo size
 * @param getResponsiveValue Function to get responsive values
 */
export const createOnboardingStyles = (
  isWeb: boolean,
  isDesktop: boolean,
  containerWidth: number,
  width: number,
  height: number,
  baseFontSize: number,
  subtitleFontSize: number,
  logoSize: number,
  getResponsiveValue: any
) => {
  // Calculate derived values
  const lineHeight = baseFontSize * 1.14;
  const letterSpacing = baseFontSize * -0.03;

  return StyleSheet.create({
    container: {
      flex: 1,
      ...(isWeb && {
        display: "flex",
        justifyContent: "center",
      }),
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      padding: 20,
      paddingBottom: 40,
      ...(isDesktop && {
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: containerWidth,
        alignSelf: "center",
        paddingHorizontal: 40,
      }),
    },
    mobileLogoContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    desktopLogoContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingRight: 40,
    },
    contentContainer: {
      width: "100%",
      flex: 1,
      justifyContent: "space-between",
    },
    desktopContentContainer: {
      flex: 2,
      justifyContent: "center",
    },
    textContainer: {
      alignItems: "center",
      marginTop: 20,
      ...(isDesktop && {
        alignItems: "flex-start",
      }),
    },
    text: {
      color: "#0B3B3C",
      textAlign: "center",
      fontFamily: "Montserrat-Bold",
      fontSize: baseFontSize,
      lineHeight,
      letterSpacing,
      ...(isDesktop && {
        textAlign: "left",
      }),
    },
    subtitle: {
      color: "#0B3B3C",
      textAlign: "center",
      fontFamily: "Montserrat",
      fontSize: subtitleFontSize,
      marginTop: 20,
      maxWidth: "80%",
      lineHeight: 24,
      ...(isDesktop && {
        textAlign: "left",
        maxWidth: "100%",
        lineHeight: 32,
        marginBottom: 40,
      }),
    },
    bottomContainer: {
      width: "100%",
      alignItems: "center",
      ...(isDesktop && {
        width: getResponsiveValue({
          base: width,
          lg: 400,
        }),
      }),
    },
    learnMore: {
      color: "#0B3B3C",
      fontFamily: "Montserrat",
      fontSize: isDesktop ? 18 : 16,
      textDecorationLine: "underline",
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#7E0707",
      paddingVertical: isDesktop ? 20 : 16,
      paddingHorizontal: 32,
      borderRadius: 100,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      ...(isDesktop && {
        marginTop: 24,
      }),
    },
    buttonText: {
      color: "#FFFFFF",
      fontFamily: "Montserrat-SemiBold",
      fontSize: isDesktop ? 20 : 18,
    },
  });
};
