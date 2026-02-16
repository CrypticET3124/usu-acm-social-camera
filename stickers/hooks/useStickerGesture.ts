import { SharedValue, useSharedValue } from "react-native-reanimated";
import { StickerRegistry } from "../registry";
import { StickerId } from "../types";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";
import { isNearTrashWorklet } from "../utils/trash";

export type UseStickerGestureArgs = {
  stickerId: StickerId;
  registry: StickerRegistry;
  baseSize: number;
  x: SharedValue<number>;
  y: SharedValue<number>;
  scale: SharedValue<number>;
  rotation: SharedValue<number>;
  onDraggingChange?: (dragging: boolean) => void;
};

export function useStickerGesture({
  stickerId,
  registry,
  baseSize,
  x,
  y,
  scale,
  rotation,
  onDraggingChange,
}: UseStickerGestureArgs) {
  const window = Dimensions.get("window");
  const { bringToFront, select, setTransform, commit, remove } =
    registry.actions;

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startScale = useSharedValue(1);
  const startRotation = useSharedValue(0);

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

  const beginPan = () => {
    bringToFront(stickerId);
    select(stickerId);
    onDraggingChange?.(true);
  };

  const finalizePan = () => {
    onDraggingChange?.(false);
  };

  const endPan = (nearTrash: boolean) => {
    onDraggingChange?.(false);
    if (nearTrash) {
      registry.actions.remove(stickerId);
    } else {
      commitToRegistry();
    }
  };

  const pan = Gesture.Pan()
    .maxPointers(1) // single finger: translate only
    .onBegin(() => {
      scheduleOnRN(beginPan);

      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((e) => {
      x.value = startX.value + e.translationX;
      y.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      const nearTrash = isNearTrashWorklet({
        x: x.value,
        y: y.value,
        scale: scale.value,
        baseSize,
        windowWidth: window.width,
      });
      scheduleOnRN(endPan, nearTrash);
    })
    .onFinalize(() => {
      scheduleOnRN(finalizePan);
    });

  const pinch = Gesture.Pinch()
    .onBegin(() => {
      scheduleOnRN(bringToFront, stickerId);
      scheduleOnRN(select, stickerId);

      startScale.value = scale.value;
    })
    .onUpdate((e) => {
      scale.value = startScale.value * e.scale;
    })
    .onEnd(() => {
      scheduleOnRN(commitToRegistry);
    });

  const rotate = Gesture.Rotation()
    .onBegin(() => {
      scheduleOnRN(bringToFront, stickerId);
      scheduleOnRN(select, stickerId);

      startRotation.value = rotation.value;
    })
    .onUpdate((e) => {
      rotation.value = startRotation.value + e.rotation;
    })
    .onEnd(() => {
      scheduleOnRN(commitToRegistry);
    });

  return { gesture: Gesture.Simultaneous(pan, pinch, rotate) };
}
