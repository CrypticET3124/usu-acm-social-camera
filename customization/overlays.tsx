import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { OverlayPreset } from "../camera";

export function BasicOverlay({ preset }: { preset: OverlayPreset }) {
  return (
    <View pointerEvents="none" style={styles.overlay}>
      <View style={styles.topRow}>
        <LinearGradient
          colors={["rgba(5,5,5,0.9)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.caption}>{preset.caption}</Text>
          <View style={styles.cardHeader}>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {preset.handle.replace("@", "").charAt(0).toUpperCase() || "@"}
              </Text>
            </View>

            <View style={styles.headerText}>
              <Text style={styles.handle}>{preset.handle}</Text>
              <Text style={styles.subtext}>Captured with Camerlay</Text>
            </View>

            <Text style={styles.emoji}>{preset.emoji}</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.brandPill}>
          <Text style={styles.brandText}>USU ACM</Text>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={styles.brandIcon}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // paddingVertical: 32,
    // paddingHorizontal: 18,
    justifyContent: "space-between",
  },

  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  bottomRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },

  card: {
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 6,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  headerText: {
    flex: 1,
    marginLeft: 10,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(155,155,155,1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "white", fontWeight: "800" },

  handle: { color: "white", fontWeight: "800", fontSize: 15 },
  subtext: { color: "rgba(230,230,230,1)", fontSize: 12 },
  emoji: { fontSize: 24, marginLeft: 12 },
  caption: { color: "white", fontSize: 18, fontWeight: "700" },

  brandPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  brandIcon: { width: 30, height: 30, marginLeft: 6 },
  brandText: {
    color: "#FFFA",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});
