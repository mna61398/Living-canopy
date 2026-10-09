import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ComponentProps } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { EditableName } from '../../components/EditableName';
import { TreeMap } from '../../components/TreeMap';
import { Card, ProgressBar, SectionTitle, StatusAlive } from '../../components/ui';
import { useTrees } from '../../context/TreesContext';
import { getSensorAlerts, getTreeType } from '../../data/trees';
import { colors, radius, spacing } from '../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export default function TreeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trees, renameTree } = useTrees();
  const tree = trees.find((t) => t.id === id);

  if (!tree) {
    return (
      <View style={styles.missing}>
        <Text>Tree not found.</Text>
      </View>
    );
  }

  const type = getTreeType(tree.typeId)!;
  const alerts = getSensorAlerts(tree);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen options={{ title: tree.customName }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TreeMap latitude={tree.coordinate.latitude} longitude={tree.coordinate.longitude} label={type.region} />

        <Card style={{ gap: spacing.sm }}>
          <View style={styles.titleRow}>
            <Text style={{ fontSize: 30 }}>{type.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.type}>{type.name}</Text>
              <Text style={styles.muted}>{type.community}</Text>
            </View>
            <StatusAlive />
          </View>
          <Text style={styles.label}>Rename your tree</Text>
          <EditableName name={tree.customName} onSave={(n) => renameTree(tree.id, n)} />
          <Text style={styles.muted}>Adopted on {tree.adoptedOn}</Text>
        </Card>

        <Card style={{ gap: spacing.md }}>
          <SectionTitle>Vital signs</SectionTitle>
          <Stat
            icon="hourglass"
            label="Age"
            value={`${tree.ageYears} years`}
            progress={tree.ageYears / type.lifespanYears}
            caption={`Can live ~${type.lifespanYears} years`}
            color={colors.amber}
          />
          <Stat
            icon="resize"
            label="Height"
            value={`${tree.heightM} m`}
            progress={tree.heightM / type.maxHeightM}
            caption={`Mature trees reach ~${type.maxHeightM} m`}
            color={colors.moss}
          />
          <Stat
            icon="cloud-done"
            label="Carbon stored"
            value={`${tree.carbonKg.toLocaleString('en-US')} kg CO₂`}
            progress={tree.carbonKg / type.maxCarbonKg}
            caption={`≈ ${Math.round(tree.carbonKg / 120).toLocaleString('en-US')} car trips of 500 km avoided`}
            color={colors.leaf}
          />
        </Card>

        <Card>
          <View style={styles.feedHeader}>
            <SectionTitle>Sensor alerts</SectionTitle>
            <View style={styles.live}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          {alerts.map((a, i) => (
            <View key={a.id} style={[styles.alert, i === alerts.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.alertIcon}>
                <Ionicons name={a.icon as IconName} size={16} color={colors.canopy} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.alertTitle}>{a.title}</Text>
                <Text style={styles.muted}>{a.time}</Text>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Stat(props: {
  icon: IconName;
  label: string;
  value: string;
  progress: number;
  caption: string;
  color: string;
}) {
  return (
    <View style={{ gap: 6 }}>
      <View style={styles.statRow}>
        <Ionicons name={props.icon} size={16} color={colors.muted} />
        <Text style={[styles.muted, { flex: 1 }]}>{props.label}</Text>
        <Text style={styles.statValue}>{props.value}</Text>
      </View>
      <ProgressBar value={props.progress} color={props.color} />
      <Text style={styles.caption}>{props.caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: spacing.md, paddingBottom: spacing.xl },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  type: { fontSize: 18, fontWeight: '700', color: colors.text },
  muted: { color: colors.muted, fontSize: 13 },
  label: { fontSize: 12, fontWeight: '700', color: colors.muted, textTransform: 'uppercase', marginTop: spacing.sm },
  statRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statValue: { fontSize: 16, fontWeight: '800', color: colors.text, fontVariant: ['tabular-nums'] },
  caption: { color: colors.muted, fontSize: 12 },
  feedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  live: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E8F9EE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.alive },
  liveText: { color: '#15803D', fontWeight: '800', fontSize: 11 },
  alert: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  alertIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: { color: colors.text, fontSize: 14, fontWeight: '600', lineHeight: 19 },
});
