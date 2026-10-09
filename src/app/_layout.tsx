import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { TreesProvider } from '../context/TreesContext';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <TreesProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.forest },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.cream },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="subscribe/[id]" options={{ title: 'Subscription' }} />
        <Stack.Screen name="tree/[id]" options={{ title: 'My Tree' }} />
        <Stack.Screen name="terms" options={{ title: 'Terms of Agreement', presentation: 'modal' }} />
      </Stack>
    </TreesProvider>
  );
}
