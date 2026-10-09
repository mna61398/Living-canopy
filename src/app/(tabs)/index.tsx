import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ComponentProps } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, SectionTitle } from '../../components/ui';
import { colors, radius, spacing } from '../../theme';

const STEPS: { icon: ComponentProps<typeof Ionicons>['name']; title: string; body: string }[] = [
  { icon: 'heart', title: 'Adopt', body: 'Choose a real Amazon tree and subscribe monthly.' },
  { icon: 'people', title: 'Community harvests', body: 'Local families sustainably harvest fruit, nuts and seeds from it.' },
  { icon: 'cube', title: 'Products delivered', body: 'Each month you receive a box of finished goods made from your tree.' },
  { icon: 'shield-checkmark', title: 'Forest protected', body: 'The community only earns while your tree stays standing.' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
      <View style={[styles.hero, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.brandRow}>
          <Ionicons name="leaf" size={22} color={colors.moss} />
          <Text style={styles.brand}>Living Canopy</Text>
        </View>
        <Text style={styles.tagline}>A cut tree pays once.{'\n'}A living tree pays every month.</Text>
        <Text style={styles.heroBody}>
          Adopt a real tree in the Amazon. The community that cares for it harvests its gifts and sends them to your
          door, and they keep earning only as long as it stays alive.
        </Text>
        <View style={styles.heroButtons}>
          <Button label="Adopt a Tree" icon="leaf" onPress={() => router.push('/adopt')} />
          <Button label="My Trees" icon="earth" variant="light" onPress={() => router.push('/my-trees')} />
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle>How it works</SectionTitle>
        {STEPS.map((step, i) => (
          <View key={step.title} style={styles.stepRow}>
            <View style={styles.stepRail}>
              <View style={styles.stepIcon}>
                <Ionicons name={step.icon} size={20} color={colors.white} />
              </View>
              {i < STEPS.length - 1 && <View style={styles.stepLine} />}
            </View>
            <Card style={styles.stepCard}>
              <Text style={styles.stepNum}>Step {i + 1}</Text>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepBody}>{step.body}</Text>
            </Card>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Card style={styles.impact}>
          <Text style={styles.impactBig}>🌳 → 💚 → 📦</Text>
          <Text style={styles.impactText}>
            Every box is proof your tree is still standing, watched by satellite and protected by the people who live
            beside it.
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.forest,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg },
  brand: { color: colors.moss, fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  tagline: { color: colors.white, fontSize: 30, lineHeight: 38, fontWeight: '800' },
  heroBody: { color: '#CFE3D7', fontSize: 15, lineHeight: 22, marginTop: spacing.md },
  heroButtons: { gap: spacing.sm, marginTop: spacing.lg },
  section: { paddingHorizontal: spacing.md, marginTop: spacing.lg },
  stepRow: { flexDirection: 'row', gap: spacing.sm },
  stepRail: { alignItems: 'center', width: 40 },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.leaf,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLine: { flex: 1, width: 2, backgroundColor: colors.border, marginVertical: 4 },
  stepCard: { flex: 1, marginBottom: spacing.md },
  stepNum: { color: colors.leaf, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  stepTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 2 },
  stepBody: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 4 },
  impact: { backgroundColor: colors.mint, borderColor: colors.mint, alignItems: 'center', borderRadius: radius.lg },
  impactBig: { fontSize: 28, marginBottom: spacing.sm },
  impactText: { color: colors.canopy, textAlign: 'center', fontSize: 14, lineHeight: 20 },
});
