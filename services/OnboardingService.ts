import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Interface for onboarding content
 */
export interface OnboardingContent {
  heading1: string;
  heading2: string;
  subtitle: string;
  learnMoreText: string;
  buttonText: string;
}

/**
 * Service class for handling onboarding functionality
 */
export class OnboardingService {
  /**
   * Calculate responsive values for fonts and sizing
   * @param width The window width
   * @param height The window height
   * @param getResponsiveValue Function to get responsive values
   */
  static calculateResponsiveValues(
    width: number,
    height: number,
    getResponsiveValue: any
  ) {
    // Calculate base font size
    const baseFontSize = getResponsiveValue({
      base: Math.min(width * 0.15, height * 0.1),
      md: Math.min(width * 0.12, height * 0.09),
      lg: Math.min(width * 0.08, height * 0.08),
      xl: Math.min(width * 0.06, height * 0.07),
    });

    // Calculate subtitle font size
    const subtitleFontSize = getResponsiveValue({
      base: baseFontSize * 0.25,
      lg: Math.max(16, baseFontSize * 0.2)
    });

    // Calculate logo size
    const logoSize = getResponsiveValue({
      base: width * 0.3,
      md: width * 0.25,
      lg: Math.min(width * 0.18, 250),
    });

    return {
      baseFontSize,
      subtitleFontSize,
      logoSize
    };
  }

  /**
   * Perform haptic feedback on button press (if on native platform)
   * @param feedbackType The type of haptic feedback to trigger
   */
  static triggerHapticFeedback(feedbackType: 'medium' | 'light' = 'medium') {
    if (Platform.OS !== 'web') {
      const style = feedbackType === 'medium' 
        ? Haptics.ImpactFeedbackStyle.Medium 
        : Haptics.ImpactFeedbackStyle.Light;
      
      Haptics.impactAsync(style);
    }
  }

  /**
   * Get the content for the onboarding screen
   */
  static getContent(): OnboardingContent {
    return {
      heading1: 'Be good',
      heading2: 'to yourself',
      subtitle: "We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.",
      learnMoreText: 'Learn more',
      buttonText: 'Take the quiz'
    };
  }
} 