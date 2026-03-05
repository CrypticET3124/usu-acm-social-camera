import { Pressable, StyleSheet, View, TouchableOpacity } from "react-native";
import type { StickerPack } from "../../sticker-engine";

type Props = {
  visible: boolean;
  pack: StickerPack;
  onSelect: (id: keyof StickerPack) => void;
  onClose: () => void;
};

export function StickerPicker({ visible, pack, onSelect, onClose }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.backdrop} pointerEvents="box-none">
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      <View style={styles.sheet}>
        {Object.entries(pack).map(([id, Render]) => (
          <TouchableOpacity
            key={id}
            style={styles.item}
            onPress={() => onSelect(id as keyof StickerPack)}
          >
            <View style={styles.stickerContainer} pointerEvents="none">
              <Render size={52}/>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  sheet: {
    backgroundColor: "rgba(100,100,100,0.60)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 90,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "92%",
  },
  item: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    padding: 6,
  },
  stickerContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
