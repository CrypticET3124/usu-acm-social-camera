import { View, StyleSheet } from "react-native";
import { StickerRegistry } from "./registry";
import { StickerPack } from "./types";
import StickerView from "./view";

export default function StickerLayer({
  pack,
  registry,
}: {
  pack: StickerPack;
  registry: StickerRegistry;
}) {
  const stickers = registry.getOrderedStickers();

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }} pointerEvents="box-none">
      {stickers.map((s) => (
        <StickerView
          key={s.id}
          stickerId={s.id}
          pack={pack}
          registry={registry}
        />
      ))}
    </View>
  );
}
