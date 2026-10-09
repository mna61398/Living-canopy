import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';

import { colors } from '../../theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.forest },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: colors.leaf,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.border },
        tabBarLabelStyle: { fontWeight: '600' },
        sceneStyle: { backgroundColor: colors.cream },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="adopt"
        options={{
          title: 'Adopt',
          headerTitle: 'Choose a Tree',
          tabBarIcon: ({ color, size }) => <Ionicons name="leaf" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="my-trees"
        options={{
          title: 'My Trees',
          tabBarIcon: ({ color, size }) => <Ionicons name="earth" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
