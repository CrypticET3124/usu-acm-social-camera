import { StatusBar } from "expo-status-bar";
import { useMemo, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { CameraCapturedPicture, CameraView } from "expo-camera";
import { useCameraReady } from "./hooks/use-camera-ready";
import { useStickerRegistry } from "../stickers";
import type { StickerPack } from "../stickers";
import { CameraPane } from "./components/camera-pane";
import { PreviewPane } from "./components/preview-pane";
import { useCameraFacing } from "./hooks/use-camera-facing";
import { useHintToast } from "./hooks/use-hint-toast";
import { useSwipeToFlip } from "./hooks/use-swipe-to-flip";
import { useExportShare } from "./hooks/use-export-share";
import type { OverlayPreset, OverlayProps } from "../customization";
import type { Mode } from "./types";

export function Camerlay({
  presets,
  stickerPack,
  OverlayComponent,
  onFinish,
}: {
  presets: OverlayPreset[];
  stickerPack: StickerPack;
  OverlayComponent: React.ComponentType<OverlayProps>;
  onFinish: () => void;
}) {
  const { ready, loading } = useCameraReady(onFinish);

  const [mode, setMode] = useState<Mode>("camera");
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);
  const [presetIndex, setPresetIndex] = useState(0);
  const stickerRegistry = useStickerRegistry();
  const [pickerOpen, setPickerOpen] = useState(false);

  const { facing, toggleFacing } = useCameraFacing();
  const { visible: showHint, show: showHintToast } = useHintToast();
  const { snapRef, exportShare, isExporting } = useExportShare({ onFinish });

  const cameraRef = useRef<CameraView | null>(null);

  const preset = useMemo(() => {
    if (presets.length === 0)
      return { emoji: "✨", caption: "No presets", handle: "@you" };
    return presets[presetIndex % presets.length];
  }, [presets, presetIndex]);

  const nextOverlay = () =>
    setPresetIndex((i) => (i + 1) % Math.max(1, presets.length));

  const capturePhoto = async () => {
    if (!cameraRef.current) return;
    const pic = await cameraRef.current.takePictureAsync(
      facing === "front" ? { mirror: true } : undefined,
    );
    if (!pic?.uri) return;
    setImage(pic);
    setMode("preview");
  };

  const toggleStickerPicker = () => setPickerOpen((v) => !v);
  const closeStickerPicker = () => setPickerOpen(false);
  const addSticker = (packId: keyof StickerPack) => {
    stickerRegistry.actions.add(packId);
    closeStickerPicker();
  };

  const retake = () => {
    stickerRegistry.actions.reset();
    setImage(null);
    setMode("camera");
  };

  const panHandlers = useSwipeToFlip({
    enabled: mode === "camera",
    onFlip: toggleFacing,
    onTap: showHintToast,
  });

  if (loading || !ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {mode === "camera" && (
        <CameraPane
          cameraRef={cameraRef}
          facing={facing}
          preset={preset}
          OverlayComponent={OverlayComponent}
          panHandlers={panHandlers}
          showHint={showHint}
          onCapture={capturePhoto}
          onClose={onFinish}
          onNextOverlay={nextOverlay}
        />
      )}

      {mode === "preview" && image && (
        <PreviewPane
          image={image}
          preset={preset}
          stickerPack={stickerPack}
          OverlayComponent={OverlayComponent}
          snapRef={snapRef}
          stickerRegistry={stickerRegistry}
          pickerOpen={pickerOpen}
          onClosePicker={closeStickerPicker}
          onSelectSticker={addSticker}
          onRetake={retake}
          onNextOverlay={nextOverlay}
          onTogglePicker={toggleStickerPicker}
          onShare={exportShare}
          isExporting={isExporting}
        />
      )}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "black" },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
});
