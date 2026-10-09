import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, Chip } from '../../components/ui';
import { TREE_TYPES, TreeType } from '../../data/trees';
import { colors, spacing } from '../../theme';

export default function AdoptScreen() {
  return (
    <FlatList
      data={TREE_TYPES}
      keyExtractor={(t) => t.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <Text style={styles.intro}>
          Every tree is real, mapped and cared for by a local community. Tap a tree to see what your subscription
          includes.
        </Text>
      }
      renderItem={({ item }) => <TreeCard tree={item} />}
    />
  );
}

function TreeCard({ tree }: { tree: TreeType }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push({ pathname: '/subscribe/[id]', params: { id: tree.id } })}
      style={({ pressed }) => pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] }}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.emoji}>
            <Text style={{ fontSize: 28 }}>{tree.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{tree.name}</Text>
            <View style={styles.communityRow}>
              <Ionicons name="people" size={13} color={colors.muted} />
              <Text style={styles.community}>{tree.community}</Text>
            </View>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceValue}>${tree.pricePerMonth}</Text>
            <Text style={styles.priceUnit}>/month</Text>
          </View>
        </View>
        <Text style={styles.productsLabel}>Products from this tree</Text>
        <View style={styles.chips}>
          {tree.products.map((p) => (
            <Chip key={p} label={p} />
          ))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>See subscription details</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.leaf} />
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.md, gap: spacing.md },
  intro: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  card: { gap: spacing.sm },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  emoji: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 18, fontWeight: '700', color: colors.text },
  communityRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  community: { color: colors.muted, fontSize: 13, flexShrink: 1 },
  price: { alignItems: 'flex-end' },
  priceValue: { fontSize: 22, fontWeight: '800', color: colors.canopy },
  priceUnit: { fontSize: 12, color: colors.muted },
  productsLabel: { fontSize: 12, fontWeight: '700', color: colors.muted, textTransform: 'uppercase', marginTop: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 2, marginTop: 4 },
  footerText: { color: colors.leaf, fontWeight: '600', fontSize: 13 },
});
