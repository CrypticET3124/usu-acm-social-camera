import { useEffect } from "react";
import { StickerRegistry } from "./registry";
import { StickerPack } from "./types";
import { StyleSheet, Text, View } from "react-native";
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
  const scale = useSharedValue(t.scale);
  const rotation = useSharedValue(t.rotation);

  const startX = useSharedValue(t.x);
  const startY = useSharedValue(t.y);
  const startScale = useSharedValue(t.scale);
  const startRotation = useSharedValue(t.rotation);

  // pivot / anchor in local coords
  const anchorX = useSharedValue(0);
  const anchorY = useSharedValue(0);

  useEffect(() => {
    x.value = t.x;
    y.value = t.y;
    scale.value = t.scale;
    rotation.value = t.rotation;

    startX.value = t.x;
    startY.value = t.y;
    startScale.value = t.scale;
    startRotation.value = t.rotation;
  }, [t.x, t.y, t.scale, t.rotation]);

  const { bringToFront, select, setTransform, commit } = registry.actions;

  const commitToRegistry = () => {
    setTransform(
      stickerId,
      {
        x: x.value,
        y: y.value,
        scale: scale.value,
        rotation: rotation.value,
      },
      false,
    );
    commit();
  };

  const pan = Gesture.Pan()
    .maxPointers(1)
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

  const pinch = Gesture.Pinch()
    .onBegin((e) => {
      scheduleOnRN(bringToFront, stickerId);
      scheduleOnRN(select, stickerId);

      startScale.value = scale.value;

      anchorX.value = e.focalX - x.value;
      anchorY.value = e.focalY - y.value;
    })
    .onUpdate((e) => {
      x.value = e.focalX - anchorX.value;
      y.value = e.focalY - anchorY.value;

      scale.value = startScale.value * e.scale;
    })
    .onEnd(() => {
      scheduleOnRN(commitToRegistry);
    });

  const rotate = Gesture.Rotation()
    .onBegin((e) => {
      scheduleOnRN(bringToFront, stickerId);
      scheduleOnRN(select, stickerId);

      startRotation.value = rotation.value;

      anchorX.value = e.anchorX - x.value;
      anchorY.value = e.anchorY - y.value;
    })
    .onUpdate((e) => {
      x.value = e.anchorX - anchorX.value;
      y.value = e.anchorY - anchorY.value;

      rotation.value = startRotation.value + e.rotation;
    })
    .onEnd(() => {
      scheduleOnRN(commitToRegistry);
    });

  const twoFinger = Gesture.Simultaneous(pinch, rotate);
  const gesture = Gesture.Simultaneous(pan, twoFinger);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },

        { translateX: anchorX.value },
        { translateY: anchorY.value },
        { rotate: `${rotation.value}rad` },
        { scale: scale.value },
        { translateX: -anchorX.value },
        { translateY: -anchorY.value },
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
