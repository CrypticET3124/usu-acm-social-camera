import { useTheme } from "../../../theme";
import { View, Text, StyleSheet } from "react-native";

// Component-based sticker. Copy this pattern to build more complex stickers.
export function ReactionBadge({ size }: { size: number }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.badge,
        {
          paddingHorizontal: size * 0.25,
          paddingVertical: size * 0.18,
          backgroundColor: theme.surfaceColor,
          borderWidth: 1.5,
          borderColor: theme.primaryColor,
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.35 }}>🔥</Text>
      <Text
        style={[
          styles.badgeText,
          { fontSize: size * 0.22, color: theme.primaryTextColor },
        ]}
      >
        Nice!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    gap: 6,
  },
  badgeText: { fontWeight: "800", letterSpacing: 0.5 },
});
