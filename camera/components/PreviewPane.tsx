import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { CameraCapturedPicture } from "expo-camera";
import { StickerLayer } from "../../stickers/";
import type { StickerPack, useStickerRegistry } from "../../stickers";
import { StickerPicker } from "./StickerPicker";
import type { OverlayPreset, OverlayProps } from "../../customization";

type Props = {
  image: CameraCapturedPicture;
  preset: OverlayPreset;
  stickerPack: StickerPack;
  OverlayComponent: React.ComponentType<OverlayProps>;
  snapRef: React.RefObject<View | null>;
  stickerRegistry: ReturnType<typeof useStickerRegistry>;
  pickerOpen: boolean;
  onClosePicker: () => void;
  onSelectSticker: (packId: keyof StickerPack) => void;
  onRetake: () => void;
  onNextOverlay: () => void;
  onTogglePicker: () => void;
  onShare: () => void;
  isExporting: boolean;
  style?: ViewStyle;
};

export function PreviewPane({
  image,
  preset,
  stickerPack,
  OverlayComponent,
  snapRef,
  stickerRegistry,
  pickerOpen,
  onClosePicker,
  onSelectSticker,
  onRetake,
  onNextOverlay,
  onTogglePicker,
  onShare,
  isExporting,
  style,
}: Props) {
  return (
    <>
      <View
        ref={snapRef}
        collapsable={false}
        style={[StyleSheet.absoluteFillObject, style]}
      >
        <Image
          source={{ uri: image.uri }}
          style={StyleSheet.absoluteFillObject}
        />
        <StickerLayer pack={stickerPack} registry={stickerRegistry} />
        <OverlayComponent preset={preset} />
      </View>

      <LinearGradient
        pointerEvents="none"
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.bottomGradient}
      />

      <View style={styles.previewBottomRow}>
        <TouchableOpacity
          onPress={onRetake}
          hitSlop={10}
          disabled={isExporting}
          accessibilityLabel="Retake"
          style={isExporting && styles.btnDisabled}
        >
          <Ionicons name="refresh" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNextOverlay}
          hitSlop={10}
          disabled={isExporting}
          accessibilityLabel="Change overlay"
        >
          <Ionicons name="color-palette-outline" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onTogglePicker}
          hitSlop={10}
          disabled={isExporting}
          accessibilityLabel="Add sticker"
        >
          <Ionicons name="happy-outline" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onShare}
          hitSlop={10}
          disabled={isExporting}
          accessibilityLabel="Share"
          style={isExporting && styles.btnDisabled}
        >
          <Ionicons
            name={isExporting ? "hourglass-outline" : "share-outline"}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <StickerPicker
        visible={pickerOpen}
        pack={stickerPack}
        onClose={onClosePicker}
        onSelect={onSelectSticker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  previewBottomRow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  btnDisabled: { opacity: 0.6 },

  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 250,
  },
});
