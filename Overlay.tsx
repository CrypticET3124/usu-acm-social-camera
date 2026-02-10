import { StyleSheet, Text, View } from "react-native";
import type { OverlayPreset } from "./SocialCamera";

export default function Overlay({ preset }: { preset: OverlayPreset }) {
  return (
    <View pointerEvents="none" style={styles.overlay}>
      <Text style={styles.brand}>USU ACM</Text>
      <View style={styles.captionBlock}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.handle}>{preset.handle}</Text>
          <Text style={styles.emoji}>{preset.emoji}</Text>
        </View>
        <Text style={styles.caption}>{preset.caption}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    paddingVertical: 50,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  captionBlock: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.35)",
    gap: 4,
  },
  handle: { color: "white", fontWeight: "800", fontSize: 15 },
  emoji: { fontSize: 22 },
  caption: { color: "white", fontSize: 18, fontWeight: "700" },

  brand: {
    alignSelf: "flex-end",
    color: "#FFFA",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
