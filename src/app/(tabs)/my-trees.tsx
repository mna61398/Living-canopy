import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { EditableName } from '../../components/EditableName';
import { Button, Card, StatusAlive } from '../../components/ui';
import { useTrees } from '../../context/TreesContext';
import { AdoptedTree, getTreeType } from '../../data/trees';
import { colors, spacing } from '../../theme';

export default function MyTreesScreen() {
  const { trees } = useTrees();
  return (
    <FlatList
      data={trees}
      keyExtractor={(t) => t.id}
      contentContainerStyle={styles.list}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <Text style={styles.intro}>
          {trees.length} {trees.length === 1 ? 'tree' : 'trees'} standing tall because of you.
        </Text>
      }
      renderItem={({ item }) => <AdoptedTreeCard tree={item} />}
      ListFooterComponent={
        <View style={{ marginTop: spacing.sm }}>
          <Button label="Adopt another tree" icon="add" variant="secondary" onPress={() => router.navigate('/adopt')} />
        </View>
      }
    />
  );
}

function AdoptedTreeCard({ tree }: { tree: AdoptedTree }) {
  const { renameTree } = useTrees();
  const type = getTreeType(tree.typeId)!;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push({ pathname: '/tree/[id]', params: { id: tree.id } })}
      style={({ pressed }) => pressed && { opacity: 0.9 }}
    >
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.emoji}>
            <Text style={{ fontSize: 30 }}>{type.emoji}</Text>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <EditableName name={tree.customName} onSave={(n) => renameTree(tree.id, n)} />
            <Text style={styles.type}>{type.name}</Text>
          </View>
        </View>
        <View style={styles.meta}>
          <Meta icon="hourglass" text={`${tree.ageYears} years old`} />
          <Meta icon="people" text={type.community} />
        </View>
        <View style={styles.bottom}>
          <StatusAlive />
          <View style={styles.view}>
            <Text style={styles.viewText}>View on satellite</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.leaf} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

function Meta({ icon, text }: { icon: 'hourglass' | 'people'; text: string }) {
  return (
    <View style={styles.metaItem}>
      <Ionicons name={icon} size={14} color={colors.muted} />
      <Text style={styles.metaText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.md, gap: spacing.md },
  intro: { color: colors.muted, fontSize: 14 },
  card: { gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  emoji: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  type: { color: colors.leaf, fontWeight: '600', fontSize: 14 },
  meta: { gap: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { color: colors.muted, fontSize: 13, flexShrink: 1 },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  view: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  viewText: { color: colors.leaf, fontWeight: '600', fontSize: 13 },
});
