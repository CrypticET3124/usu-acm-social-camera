import { Image, Text, StyleSheet } from "react-native";
import { StickerPack } from "./types";
import { LikeButton, ReactionBadge } from "./stickers";

export const DEFAULT: StickerPack = {
  // Image-based sticker example
  usuAcm: ({ size }) => (
    <Image
      source={require("../../assets/adaptive-icon.png")}
      style={{ width: size, height: size, resizeMode: "contain" }}
    />
  ),

  minion: ({ size }) => (
    <Image
      source={require("../../assets/minion.png")}
      style={{
        width: size,
        height: size,
        resizeMode: "contain",
      }}
    />
  ),

  // Text/Emoji-based sticker examples
  flame: ({ size }) => <Text style={{ fontSize: size * 0.5 }}>🔥</Text>,

  camera: ({ size }) => (
    <Text style={{ fontSize: size * 0.7, textAlign: "center" }}>📸</Text>
  ),

  sparkle: ({ size }) => (
    <Text style={{ fontSize: size * 0.7, textAlign: "center" }}>✨</Text>
  ),

  // Component-based sticker example
  reactionBadge: ({ size }) => <ReactionBadge size={size} />,

  // Stateful sticker: teaches useState
  likeButton: ({ size }) => <LikeButton size={size} />,
};
