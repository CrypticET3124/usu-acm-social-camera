import { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

// Stateful sticker: uses useState. Teaches local state in a component.
export function LikeButton({ size }: { size: number }) {
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

const styles = StyleSheet.create({
  likeWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});