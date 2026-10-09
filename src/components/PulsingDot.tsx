import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { colors } from '../theme';

export function PulsingDot({ size = 18 }: { size?: number }) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 1600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const ring = size * 4;
  return (
    <View style={{ width: ring, height: ring, alignItems: 'center', justifyContent: 'center' }} pointerEvents="none">
      <Animated.View
        style={[
          styles.ring,
          {
            width: ring,
            height: ring,
            borderRadius: ring / 2,
            opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] }),
            transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.25, 1] }) }],
          },
        ]}
      />
      <View style={[styles.dot, { width: size, height: size, borderRadius: size / 2 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    backgroundColor: colors.alive,
  },
  dot: {
    backgroundColor: colors.alive,
    borderWidth: 3,
    borderColor: colors.white,
  },
});
