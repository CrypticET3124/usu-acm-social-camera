import { View, Text, StyleSheet, Image } from "react-native";
import type { StickerPack } from "../stickers";

// Example of a component-based sticker.
// Students can copy this pattern to build more complex stickers.
function ReactionBadgeSticker({ size }: { size: number }) {
  return (
    <View
      style={[
        styles.badge,
        {
          paddingHorizontal: size * 0.25,
          paddingVertical: size * 0.18,
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.35 }}>🔥</Text>
      <Text style={[styles.badgeText, { fontSize: size * 0.22 }]}>
        Nice!
      </Text>
    </View>
  );
}

export const BASIC_STICKER_PACK: StickerPack = {
  // Image-based sticker example
  usuAcm: ({ size }) => (
    <Image
      source={require("../assets/adaptive-icon.png")}
      style={{ width: size, height: size, resizeMode: "contain" }}
    />
  ),

  // Text-based sticker examples
  flame: ({ size }) => (
    <Text style={[styles.text, { fontSize: size * 0.5 }]}>🔥</Text>
  ),

  heart: ({ size }) => (
    <Text style={{ fontSize: size * 0.7, textAlign: "center" }}>❤️</Text>
  ),

  camera: ({ size }) => (
    <Text style={{ fontSize: size * 0.7, textAlign: "center" }}>📸</Text>
  ),

  sparkle: ({ size }) => (
    <Text style={{ fontSize: size * 0.7, textAlign: "center" }}>✨</Text>
  ),

  // Component-based sticker example
  reactionBadge: ({ size }) => <ReactionBadgeSticker size={size} />,
};

const styles = StyleSheet.create({
  text: { color: "white" },

  pill: { backgroundColor: "rgba(0,0,0,0.35)", borderRadius: 999 },
  pillText: { color: "white", fontWeight: "900", letterSpacing: 1 },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.55)",
    gap: 6,
  },
  badgeText: { color: "white", fontWeight: "800", letterSpacing: 0.5 },
});
