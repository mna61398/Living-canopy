import { Ionicons } from '@expo/vector-icons';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { ComponentProps, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Button, Card, Chip, SectionTitle } from '../../components/ui';
import { useTrees } from '../../context/TreesContext';
import { getTreeType, MONEY_SPLIT } from '../../data/trees';
import { colors, radius, spacing } from '../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export default function SubscribeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const tree = getTreeType(id ?? '');
  const { adoptTree } = useTrees();
  const [treeName, setTreeName] = useState('');
  const [agreed, setAgreed] = useState(false);

  if (!tree) {
    return (
      <View style={styles.missing}>
        <Text style={styles.body}>Tree not found.</Text>
      </View>
    );
  }

  const included: { icon: IconName; text: string }[] = [
    { icon: 'cube', text: `A monthly box of products from your ${tree.name}` },
    { icon: 'leaf', text: 'Adoption of one real, mapped tree' },
    { icon: 'phone-portrait', text: 'The Living Canopy app' },
    { icon: 'planet', text: 'Satellite & sensor monitoring, 24/7' },
    { icon: 'ribbon', text: 'A personalised tree certificate' },
  ];

  const splitTotal = MONEY_SPLIT.reduce((sum, s) => sum + s.amount, 0);

  const subscribe = () => {
    const adopted = adoptTree(tree.id, treeName);
    router.navigate('/my-trees');
    Alert.alert(
      'Welcome to the canopy 🌳',
      `${adopted.customName} is now yours. ${tree.community} will send your first box this month.`,
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen options={{ title: tree.name }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{tree.emoji}</Text>
          <Text style={styles.heroTitle}>{tree.name}</Text>
          <Text style={styles.heroSub}>
            {tree.community} · {tree.region}
          </Text>
          <View style={styles.pricePill}>
            <Text style={styles.priceValue}>${tree.pricePerMonth}</Text>
            <Text style={styles.priceUnit}> / month</Text>
          </View>
          <Text style={styles.heroDesc}>{tree.description}</Text>
        </View>

        <Card>
          <SectionTitle>What’s included</SectionTitle>
          {included.map((item) => (
            <View key={item.text} style={styles.includedRow}>
              <Ionicons name={item.icon} size={18} color={colors.leaf} />
              <Text style={styles.body}>{item.text}</Text>
            </View>
          ))}
          <View style={styles.notice}>
            <Ionicons name="checkmark-circle" size={20} color={colors.canopy} />
            <Text style={styles.noticeText}>
              The cost of your products is <Text style={{ fontWeight: '800' }}>included</Text> in your $
              {tree.pricePerMonth}/month. No extra charges for the box or shipping.
            </Text>
          </View>
          <Text style={styles.label}>Your box may include</Text>
          <View style={styles.chips}>
            {tree.products.map((p) => (
              <Chip key={p} label={p} />
            ))}
          </View>
        </Card>

        <Card style={styles.packaging}>
          <Text style={{ fontSize: 28 }}>♻️</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Packaging made from açaí seed waste</Text>
            <Text style={styles.body}>
              Every box is moulded from discarded açaí seeds, turning a waste product into a compostable package.
            </Text>
          </View>
        </Card>

        <Card>
          <SectionTitle>Where your money goes</SectionTitle>
          <Text style={[styles.body, { marginBottom: spacing.sm }]}>Example split of a ${splitTotal} subscription:</Text>
          <View style={styles.splitBar}>
            {MONEY_SPLIT.map((s) => (
              <View key={s.label} style={{ flex: s.amount, backgroundColor: s.color }} />
            ))}
          </View>
          {MONEY_SPLIT.map((s) => (
            <View key={s.label} style={styles.splitRow}>
              <View style={[styles.swatch, { backgroundColor: s.color }]} />
              <Text style={[styles.body, { flex: 1 }]}>{s.label}</Text>
              <Text style={styles.splitAmount}>${s.amount}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <SectionTitle>Name your tree</SectionTitle>
          <TextInput
            value={treeName}
            onChangeText={setTreeName}
            placeholder={`e.g. My ${tree.name}`}
            placeholderTextColor={colors.muted}
            maxLength={40}
            style={styles.input}
            returnKeyType="done"
          />
          <Text style={styles.hint}>It will appear on your certificate and in My Trees. You can change it later.</Text>
        </Card>

        <Card>
          <Link href="/terms" asChild>
            <Pressable style={styles.termsLink} accessibilityRole="link">
              <Ionicons name="document-text" size={18} color={colors.leaf} />
              <Text style={styles.termsLinkText}>Read the Terms of Agreement</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.leaf} />
            </Pressable>
          </Link>
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreed }}
            onPress={() => setAgreed((a) => !a)}
            style={styles.checkRow}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
              {agreed && <Ionicons name="checkmark" size={16} color={colors.white} />}
            </View>
            <Text style={styles.body}>I agree to the Terms</Text>
          </Pressable>
        </Card>

        <Button
          label={`Subscribe · $${tree.pricePerMonth}/month`}
          icon="leaf"
          onPress={subscribe}
          disabled={!agreed}
        />
        {!agreed && <Text style={styles.hintCenter}>Tick “I agree to the Terms” to subscribe.</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.md, gap: spacing.md, paddingBottom: spacing.xl * 2 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: {
    backgroundColor: colors.forest,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  heroEmoji: { fontSize: 48 },
  heroTitle: { color: colors.white, fontSize: 24, fontWeight: '800', marginTop: spacing.sm },
  heroSub: { color: colors.moss, fontSize: 13, marginTop: 4, textAlign: 'center' },
  pricePill: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    marginTop: spacing.md,
  },
  priceValue: { color: colors.white, fontSize: 26, fontWeight: '800' },
  priceUnit: { color: '#CFE3D7', fontSize: 14 },
  heroDesc: { color: '#CFE3D7', fontSize: 14, lineHeight: 20, textAlign: 'center', marginTop: spacing.md },
  body: { color: colors.text, fontSize: 14, lineHeight: 20, flexShrink: 1 },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 4 },
  includedRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 5 },
  notice: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.mint,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  noticeText: { color: colors.canopy, fontSize: 14, lineHeight: 20, flex: 1 },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
    marginTop: spacing.md,
    marginBottom: 6,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  packaging: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  splitBar: {
    flexDirection: 'row',
    height: 14,
    borderRadius: radius.pill,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  splitRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 4 },
  swatch: { width: 12, height: 12, borderRadius: 4 },
  splitAmount: { fontWeight: '700', color: colors.text, fontSize: 15, fontVariant: ['tabular-nums'] },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.cream,
  },
  hint: { color: colors.muted, fontSize: 12, marginTop: 6 },
  hintCenter: { color: colors.muted, fontSize: 12, textAlign: 'center', marginTop: -spacing.sm },
  termsLink: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 4 },
  termsLinkText: { color: colors.leaf, fontWeight: '700', fontSize: 15, flex: 1, textDecorationLine: 'underline' },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.canopy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.leaf, borderColor: colors.leaf },
});
