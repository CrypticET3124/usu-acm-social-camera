import { useEffect } from "react";
import { StickerRegistry } from "./registry";
import { StickerPack } from "./types";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function StickerView({
  stickerId,
  pack,
  registry,
}: {
  stickerId: string;
  pack: StickerPack;
  registry: StickerRegistry;
}) {
  const sticker = registry.state.byId[stickerId];
  if (!sticker) return null;

  const def = pack[sticker.packId];
  const t = sticker.transform;

  const x = useSharedValue(t.x);
  const y = useSharedValue(t.y);
  const startX = useSharedValue(t.x);
  const startY = useSharedValue(t.y);

  const initialScale = t.scale;
  const initialRotation = t.rotation;

  useEffect(() => {
    x.value = t.x;
    y.value = t.y;

    startX.value = t.x;
    startY.value = t.y;
  }, [t.x, t.y, t.scale, t.rotation]);

  const { bringToFront, select, setTransform, commit } = registry.actions;

  const commitToRegistry = () => {
    setTransform(
      stickerId,
      {
        x: x.value,
        y: y.value,
        scale: initialScale,
        rotation: initialRotation,
      },
      false,
    );
    commit();
  };

  const pan = Gesture.Pan()
    .maxPointers(1) // single finger: translate only
    .onBegin(() => {
      scheduleOnRN(bringToFront, stickerId);
      scheduleOnRN(select, stickerId);

      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((e) => {
      x.value = startX.value + e.translationX;
      y.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      scheduleOnRN(commitToRegistry);
    });
  const gesture = pan;

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { rotate: `${initialRotation}rad` },
        { scale: initialScale },
      ],
    };
  });

  const BASE_SIZE = 120;

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
