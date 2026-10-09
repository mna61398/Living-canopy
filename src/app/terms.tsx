import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/ui';
import { colors, spacing } from '../theme';

type Section = { icon: ComponentProps<typeof Ionicons>['name']; title: string; body: string };

const SECTIONS: Section[] = [
  {
    icon: 'thunderstorm',
    title: 'Nature sometimes has other plans',
    body:
      'Trees can fall naturally because of storms, floods or old age. That’s part of a healthy rainforest: a fallen tree returns its nutrients to the soil and opens up light and space for new growth.',
  },
  {
    icon: 'leaf',
    title: 'What we do if your tree falls',
    body:
      'The community plants a new sapling in the exact same spot. It is still YOUR tree: it keeps its name and its location on your map.',
  },
  {
    icon: 'cube',
    title: 'Your deliveries never stop',
    body:
      'While your sapling grows, your products are harvested from a mature tree of the same type in the same area, so your monthly box keeps arriving.',
  },
  {
    icon: 'people',
    title: 'Where your subscription goes',
    body: 'Your subscription directly funds the local community and the protection of the forest around your tree.',
  },
  {
    icon: 'pause-circle',
    title: 'Pause or cancel anytime',
    body: 'No lock-in and no fees. You can pause or cancel your subscription whenever you like.',
  },
];

export default function TermsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.intro}>
        We’ve kept this short and in plain language. Here’s what you’re agreeing to when you adopt a tree with Living
        Canopy.
      </Text>
      {SECTIONS.map((s, i) => (
        <Card key={s.title} style={styles.card}>
          <View style={styles.icon}>
            <Ionicons name={s.icon} size={22} color={colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {i + 1}. {s.title}
            </Text>
            <Text style={styles.body}>{s.body}</Text>
          </View>
        </Card>
      ))}
      <Text style={styles.footer}>Questions? We’re always happy to help: hello@livingcanopy.example</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: spacing.md, paddingBottom: spacing.xl },
  intro: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  card: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.leaf,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 4 },
  body: { fontSize: 14, lineHeight: 21, color: colors.text },
  footer: { color: colors.muted, fontSize: 13, textAlign: 'center', marginTop: spacing.sm },
});
