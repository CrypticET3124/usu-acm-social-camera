import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { OverlayProps } from "../types";
import { useTheme } from "../../../theme";

export function Default({ preset }: OverlayProps) {
  const theme = useTheme();
  const hasTags = preset.tags && preset.tags.length > 0;

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      <View style={styles.topRow} pointerEvents="none">
        <LinearGradient
          colors={[theme.surfaceColor, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.card}
        >
          <Text style={[styles.caption, { color: theme.primaryTextColor }]}>
            {preset.caption}
          </Text>

          <View style={styles.cardHeader}>

            <View
              style={[styles.avatar, { backgroundColor: theme.secondaryColor }]}
            >
              <Text
                style={[
                  styles.avatarText,
                  { color: theme.secondaryTextColor },
                ]}
              >
                {preset.handle.replace("@", "").charAt(0).toUpperCase() || "@"}
              </Text>
            </View>

            <View style={styles.headerText}>
              <Text style={[styles.handle, { color: theme.primaryTextColor }]}>
                {preset.handle}
              </Text>
              <Text style={[styles.subtext, { color: theme.mutedTextColor }]}>
                Captured with USU ACM Social Camera
              </Text>
            </View>

            <Text style={styles.emoji}>{preset.emoji}</Text>
          </View>
          {hasTags && (
            <View style={styles.tagsRow} pointerEvents="none">
              {preset.tags?.map((tag) => (
                <View
                  key={tag}
                  style={[styles.tag, { backgroundColor: theme.mutedColor }]}
                >
                  <Text style={[styles.tagText, { color: theme.surfaceTextColor }]}>
                    #{tag}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </LinearGradient>
      </View>

      <View style={styles.bottomRow} pointerEvents="none">
        <View
          style={[styles.brandPill, { backgroundColor: theme.surfaceColor }]}
        >
          <Text
            style={[styles.brandText, { color: theme.surfaceTextColor }]}
          >
            {preset.brandName || "USU ACM"}
          </Text>
          <Image
            source={require("../../../assets/adaptive-icon.png")}
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
  },

  headerText: {
    flex: 1,
    marginLeft: 10,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontWeight: "800" },

  handle: { fontWeight: "800", fontSize: 15 },
  subtext: { fontSize: 12 },
  emoji: { fontSize: 24, marginLeft: 12 },
  caption: { fontSize: 18, fontWeight: "700" },
  captionPressed: { opacity: 0.8 },
  tagsRow: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: { fontSize: 12, fontWeight: "600" },

  brandPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  brandIcon: { width: 30, height: 30, marginLeft: 6 },
  brandText: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});
