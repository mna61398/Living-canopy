import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native';

import { colors, radius } from '../theme';

type Props = {
  name: string;
  onSave: (name: string) => void;
  textStyle?: TextStyle;
};

// Tree name with a pencil button that switches it into an inline text field.
export function EditableName({ name, onSave, textStyle }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  const save = () => {
    if (draft.trim()) onSave(draft);
    else setDraft(name);
    setEditing(false);
  };

  if (editing) {
    return (
      <View style={styles.row}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          autoFocus
          maxLength={40}
          returnKeyType="done"
          onSubmitEditing={save}
          style={[styles.input, textStyle]}
          placeholder="Tree name"
          placeholderTextColor={colors.muted}
        />
        <Pressable accessibilityLabel="Save name" onPress={save} hitSlop={8} style={styles.iconBtn}>
          <Ionicons name="checkmark" size={20} color={colors.white} />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <Text style={[styles.name, textStyle]} numberOfLines={1}>
        {name}
      </Text>
      <Pressable
        accessibilityLabel="Rename tree"
        onPress={() => {
          setDraft(name);
          setEditing(true);
        }}
        hitSlop={8}
        style={[styles.iconBtn, styles.iconBtnGhost]}
      >
        <Ionicons name="pencil" size={15} color={colors.canopy} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { flexShrink: 1, fontSize: 18, fontWeight: '700', color: colors.text },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    borderWidth: 1.5,
    borderColor: colors.leaf,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.white,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.leaf,
  },
  iconBtnGhost: { backgroundColor: colors.mint },
});
