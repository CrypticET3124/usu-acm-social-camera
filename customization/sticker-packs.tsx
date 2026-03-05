import { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import type { StickerPack } from "../stickers";
import { useCameraTheme } from "./CameraTheme";

// Component-based sticker. Copy this pattern to build more complex stickers.
function ReactionBadgeSticker({ size }: { size: number }) {
  const theme = useCameraTheme();
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

// Stateful sticker: uses useState. Teaches local state in a component.
function LikeButtonSticker({ size }: { size: number }) {
  const [liked, setLiked] = useState(false);
  return (
    <Pressable
      onPress={() => setLiked(!liked)}
      style={({ pressed }) => [
        styles.likeWrap,
        { width: size, height: size, opacity: pressed ? 0.8 : 1 },
      ]}
      accessibilityLabel={liked ? "Liked" : "Like"}
      accessibilityRole="button"
    >
      <Text style={{ fontSize: size * 0.6, textAlign: "center" }}>
        {liked ? "❤️" : "🤍"}
      </Text>
    </Pressable>
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

  // Text/Emoji-based sticker examples
  flame: ({ size }) => (
    <Text style={[styles.text, { fontSize: size * 0.5 }]}>🔥</Text>
  ),

  camera: ({ size }) => (
    <Text style={{ fontSize: size * 0.7, textAlign: "center" }}>📸</Text>
  ),

  sparkle: ({ size }) => (
    <Text style={{ fontSize: size * 0.7, textAlign: "center" }}>✨</Text>
  ),

  // Component-based sticker example
  reactionBadge: ({ size }) => <ReactionBadgeSticker size={size} />,

  // Stateful sticker: teaches useState
  likeButton: ({ size }) => <LikeButtonSticker size={size} />,
};

const styles = StyleSheet.create({
  text: { color: "white" },

  pill: { backgroundColor: "rgba(0,0,0,0.35)", borderRadius: 999 },
  pillText: { color: "white", fontWeight: "900", letterSpacing: 1 },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    gap: 6,
  },
  badgeText: { fontWeight: "800", letterSpacing: 0.5 },

  likeWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});
