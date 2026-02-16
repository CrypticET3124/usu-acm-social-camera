import { useEffect } from "react";
import { useSharedValue } from "react-native-reanimated";
import type { StickerTransform } from "../types";

export function useSyncedStickerTransform(t: StickerTransform) {
  const x = useSharedValue(t.x);
  const y = useSharedValue(t.y);
  const scale = useSharedValue(t.scale);
  const rotation = useSharedValue(t.rotation);

  useEffect(() => {
    x.value = t.x;
    y.value = t.y;
    scale.value = t.scale;
    rotation.value = t.rotation;
  }, [t.x, t.y, t.scale, t.rotation]);

  return { x, y, scale, rotation };
}
