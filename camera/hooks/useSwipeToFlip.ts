import { useMemo } from "react";
import { PanResponder } from "react-native";

type SwipeToFlipOptions = {
  enabled: boolean;
  threshold?: number;
  onFlip: () => void;
  onTap?: () => void;
};

export function useSwipeToFlip({
  enabled,
  threshold = 40,
  onFlip,
  onTap,
}: SwipeToFlipOptions) {
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => enabled,
        onMoveShouldSetPanResponder: (_, gesture) =>
          enabled &&
          (Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10),
        onPanResponderRelease: (_, gesture) => {
          if (!enabled) return;
          const { dx, dy } = gesture;
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);

          if (absDx > threshold && absDx >= absDy) {
            onFlip();
          } else if (absDy > threshold && absDy > absDx) {
            onFlip();
          } else if (absDx < 6 && absDy < 6) {
            onTap?.();
          }
        },
      }),
    [enabled, threshold, onFlip, onTap],
  );

  return panResponder.panHandlers;
}
