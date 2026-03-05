import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { StickerRegistry } from "../registry";
import { StickerPack } from "../packs";
import StickerView from "./sticker-view";
import { TrashZone } from "./trash-zone";

export function StickerLayer({
  pack,
  registry,
}: {
  pack: StickerPack;
  registry: StickerRegistry;
}) {
  const stickers = registry.getOrderedStickers();
  const [dragging, setDragging] = useState(false);

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }} pointerEvents="box-none">
      {stickers.map((s) => (
        <StickerView
          key={s.id}
          stickerId={s.id}
          pack={pack}
          registry={registry}
          onDraggingChange={setDragging}
        />
      ))}
      <TrashZone visible={dragging} />
    </View>
  );
}
