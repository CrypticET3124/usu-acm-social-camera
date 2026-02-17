import { View, Text, StyleSheet } from "react-native";
import type { StickerPack } from "./stickers";

export const BASIC_STICKER_PACK: StickerPack = {
  flame: ({ size }) => (
    <Text style={[styles.text, { fontSize: size * 0.5 }]}>🔥</Text>
  ),

  usuAcm: ({ size }) => (
    <View
      style={[
        styles.pill,
        { paddingHorizontal: size * 0.25, paddingVertical: size * 0.18 },
      ]}
    >
      <Text style={[styles.pillText, { fontSize: size * 0.22 }]}>USU ACM</Text>
    </View>
  ),

  star: ({ size }) => (
    <Text style={{ fontSize: size, textAlign: "center" }}>⭐️</Text>
  ),
};

const styles = StyleSheet.create({
  text: { color: "white" },

  pill: { backgroundColor: "rgba(0,0,0,0.35)", borderRadius: 999 },
  pillText: { color: "white", fontWeight: "900", letterSpacing: 1 },
});
