import { StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../theme';
import { PulsingDot } from './PulsingDot';

type Props = {
  latitude: number;
  longitude: number;
  label: string;
};

// react-native-maps has no web support; show a placeholder so the web preview still works.
export function TreeMap({ latitude, longitude, label }: Props) {
  return (
    <View style={styles.wrap}>
      <PulsingDot />
      <Text style={styles.text}>Satellite view available in the mobile app · {label}</Text>
      <Text style={styles.text}>
        {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 260,
    borderRadius: radius.lg,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
  },
  text: { color: colors.white, fontSize: 12, textAlign: 'center' },
});
