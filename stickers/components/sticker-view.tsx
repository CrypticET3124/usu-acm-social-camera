import { StickerRegistry } from "../registry";
import { StickerPack } from "../types";
import { StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useSyncedStickerTransform } from "../hooks/use-synced-sticker-transform";
import { useStickerGesture } from "../hooks/use-sticker-gesture";

export default function StickerView({
  stickerId,
  pack,
  registry,
  onDraggingChange,
}: {
  stickerId: string;
  pack: StickerPack;
  registry: StickerRegistry;
  onDraggingChange?: (dragging: boolean) => void;
}) {
  const sticker = registry.state.byId[stickerId];
  if (!sticker) return null;

  const def = pack[sticker.packId];
  const t = sticker.transform;
  const BASE_SIZE = 120;

  const { x, y, scale, rotation } = useSyncedStickerTransform(t);

  const { gesture } = useStickerGesture({
    stickerId,
    registry,
    baseSize: BASE_SIZE,
    x,
    y,
    scale,
    rotation,
    onDraggingChange,
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { rotate: `${rotation.value}rad` },
        { scale: scale.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.sticker, style]}>
        {def ? (
          def({ size: BASE_SIZE })
        ) : (
          <Text style={{ color: "white" }}>Missing: {sticker.packId}</Text>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  sticker: {
    position: "absolute",
    left: 0,
    top: 0,
  },
});
