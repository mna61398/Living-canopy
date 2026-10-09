import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

import { colors, radius } from '../theme';
import { PulsingDot } from './PulsingDot';

type Props = {
  latitude: number;
  longitude: number;
  label: string;
};

// Bird's-eye satellite view centred on the tree. Panning is locked so the
// pulsing "alive" dot overlaid in the centre always sits on the tree itself.
export function TreeMap({ latitude, longitude, label }: Props) {
  return (
    <View style={styles.wrap}>
      <MapView
        style={StyleSheet.absoluteFill}
        mapType="satellite"
        initialRegion={{ latitude, longitude, latitudeDelta: 0.004, longitudeDelta: 0.004 }}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
      />
      <View style={styles.center} pointerEvents="none">
        <PulsingDot />
      </View>
      <View style={styles.badge} pointerEvents="none">
        <Text style={styles.badgeText}>🛰️ Live satellite · {label}</Text>
      </View>
      <View style={styles.coords} pointerEvents="none">
        <Text style={styles.coordsText}>
          {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 260,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.forest,
  },
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(10,42,32,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  badgeText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  coords: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(10,42,32,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  coordsText: { color: colors.white, fontSize: 11, fontVariant: ['tabular-nums'] },
});
