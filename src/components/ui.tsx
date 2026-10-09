import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, radius, shadow, spacing } from '../theme';

export function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'light';
  icon?: ComponentProps<typeof Ionicons>['name'];
  disabled?: boolean;
};

export function Button({ label, onPress, variant = 'primary', icon, disabled }: ButtonProps) {
  const palette = {
    primary: { bg: colors.leaf, fg: colors.white, border: colors.leaf },
    secondary: { bg: 'transparent', fg: colors.canopy, border: colors.canopy },
    light: { bg: 'rgba(255,255,255,0.14)', fg: colors.white, border: 'rgba(255,255,255,0.5)' },
  }[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.bg, borderColor: palette.border },
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        disabled && styles.buttonDisabled,
      ]}
    >
      {icon && <Ionicons name={icon} size={18} color={disabled ? colors.muted : palette.fg} />}
      <Text style={[styles.buttonLabel, { color: disabled ? colors.muted : palette.fg }]}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

export function StatusAlive() {
  return (
    <View style={styles.status}>
      <Text style={styles.statusText}>Status: Alive ✅</Text>
    </View>
  );
}

export function ProgressBar({ value, color = colors.leaf }: { value: number; color?: string }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1.5,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
    borderColor: colors.border,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  chip: {
    backgroundColor: colors.mint,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  chipText: {
    color: colors.canopy,
    fontSize: 12,
    fontWeight: '600',
  },
  status: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F9EE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  statusText: {
    color: '#15803D',
    fontWeight: '700',
    fontSize: 13,
  },
  track: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.mint,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
});
