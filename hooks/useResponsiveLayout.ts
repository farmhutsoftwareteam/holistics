import { useWindowDimensions } from "react-native";
import { Platform } from "react-native";

// Breakpoints matching common device widths
const breakpoints = {
  sm: 640, // Small phones
  md: 768, // Tablets/larger phones
  lg: 1024, // Small laptops/landscape tablets
  xl: 1280, // Desktop/larger laptops
  xxl: 1536, // Large desktop screens
};

/**
 * A hook that provides responsive layout helpers
 * @returns Responsive layout information and helper functions
 */
export const useResponsiveLayout = () => {
  const { width, height } = useWindowDimensions();

  // Is this device a mobile or tablet in portrait mode?
  const isPortrait = height > width;

  // Is this running on web?
  const isWeb = Platform.OS === "web";

  // Responsive layout classes
  const isExtraSmall = width < breakpoints.sm;
  const isSmall = width >= breakpoints.sm && width < breakpoints.md;
  const isMedium = width >= breakpoints.md && width < breakpoints.lg;
  const isLarge = width >= breakpoints.lg && width < breakpoints.xl;
  const isExtraLarge = width >= breakpoints.xl;

  // Helper function to get an appropriate value based on screen size
  const getResponsiveValue = <T>(options: {
    base: T; // Default value for all screen sizes
    sm?: T; // Small screens (>= 640px)
    md?: T; // Medium screens (>= 768px)
    lg?: T; // Large screens (>= 1024px)
    xl?: T; // Extra large screens (>= 1280px)
    xxl?: T; // Extra extra large screens (>= 1536px)
  }): T => {
    const { base, sm, md, lg, xl, xxl } = options;

    // Return the most specific value for the current screen size
    if (xxl !== undefined && width >= breakpoints.xxl) return xxl;
    if (xl !== undefined && width >= breakpoints.xl) return xl;
    if (lg !== undefined && width >= breakpoints.lg) return lg;
    if (md !== undefined && width >= breakpoints.md) return md;
    if (sm !== undefined && width >= breakpoints.sm) return sm;

    // Default to base value
    return base;
  };

  /**
   * Get percentage of screen width
   * @param percentage - Percentage of screen width (0-100)
   * @returns Width in pixels
   */
  const widthPercentage = (percentage: number) => {
    return (percentage / 100) * width;
  };

  /**
   * Get percentage of screen height
   * @param percentage - Percentage of screen height (0-100)
   * @returns Height in pixels
   */
  const heightPercentage = (percentage: number) => {
    return (percentage / 100) * height;
  };

  // For content that should be in a max-width container on larger screens
  const containerWidth = getResponsiveValue<number>({
    base: width,
    md: Math.min(width * 0.9, 700),
    lg: Math.min(width * 0.8, 900),
    xl: Math.min(width * 0.7, 1100),
  });

  return {
    width,
    height,
    isPortrait,
    isWeb,
    isExtraSmall,
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    getResponsiveValue,
    widthPercentage,
    heightPercentage,
    containerWidth,

    // Convenience breakpoint checks
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
  };
};
