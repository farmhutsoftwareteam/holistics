import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

/**
 * Screen displayed when a route is not found
 */
export default function NotFoundScreen() {
  const { isDesktop } = useResponsiveLayout();

  // Create styles with responsive values
  const styles = createNotFoundStyles(isDesktop);

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

/**
 * Creates styles for the not found screen based on device metrics
 * @param isDesktop Whether the device is in desktop mode
 */
const createNotFoundStyles = (isDesktop: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: isDesktop ? 40 : 20,
  },
  link: {
    marginTop: isDesktop ? 24 : 15,
    paddingVertical: isDesktop ? 20 : 15,
  },
});
