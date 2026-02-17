import { StatusBar } from "expo-status-bar";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  PanResponder,
  Text,
} from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { CameraCapturedPicture, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import useCameraReady from "../hooks/useCameraReady";
import { LinearGradient } from "expo-linear-gradient";
import {
  StickerLayer,
  useStickerRegistry,
  DEFAULT_STICKER_PACK,
} from "../stickers/";
import type { StickerPack } from "../stickers";
import StickerPicker from "./StickerPicker";

export type OverlayPreset = {
  emoji: string;
  caption: string;
  handle: string;
};

type Mode = "camera" | "preview";

export function SocialCamera({
  presets,
  OverlayComponent,
  onFinish,
}: {
  presets: OverlayPreset[];
  OverlayComponent: React.ComponentType<{ preset: OverlayPreset }>;
  onFinish: () => void;
}) {
  const { ready, loading } = useCameraReady(onFinish);

  const [mode, setMode] = useState<Mode>("camera");
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);
  const [presetIndex, setPresetIndex] = useState(0);
  const stickerRegistry = useStickerRegistry();
  const [pickerOpen, setPickerOpen] = useState(false);

  const [isExporting, setIsExporting] = useState(false);
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [showHint, setShowHint] = useState(false);

  const cameraRef = useRef<CameraView>(null);
  const snapRef = useRef<View>(null);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setImage(null);
    setMode("camera");
  };

  const exportShare = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const available = await Sharing.isAvailableAsync();
      if (!available) {
        Alert.alert(
          "Sharing not available",
          "Sharing isn't available on this device.",
        );
        return;
      }

      const node = snapRef.current;
      if (!node) {
        Alert.alert("Export failed", "Nothing to capture.");
        return;
      }

      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );

      const uri = await captureRef(node, {
        result: "tmpfile",
        format: "png",
        quality: 1,
      });

      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Share your snap",
      });

      onFinish();
    } catch (e: any) {
      console.error("exportShare error:", e);
      Alert.alert(
        "Export failed",
        e?.message ?? "Unknown error while exporting.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  const toggleFacing = useCallback(
    () => setFacing((current) => (current === "back" ? "front" : "back")),
    [],
  );

  const showHintToast = useCallback(() => {
    setShowHint(true);
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setShowHint(false), 1500);
  }, []);

  useEffect(
    () => () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    },
    [],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => mode === "camera",
        onMoveShouldSetPanResponder: (_, gestureState) =>
          mode === "camera" &&
          (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10),
        onPanResponderRelease: (_, gestureState) => {
          if (mode !== "camera") return;
          const { dx, dy } = gestureState;
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);

          if (absDx > 40 || absDy > 40) {
            toggleFacing();
          } else if (absDx < 6 && absDy < 6) {
            showHintToast();
          }
        },
      }),
    [mode, toggleFacing, showHintToast],
  );

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
        <>
          <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers}>
            <CameraView
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              facing={facing}
            />
            <OverlayComponent preset={preset} />
          </View>

          {showHint && (
            <View style={styles.hintContainer} pointerEvents="none">
              <View style={styles.hintBubble}>
                <Text style={styles.hintText}>Swipe to flip</Text>
              </View>
            </View>
          )}
          <LinearGradient
            pointerEvents="none"
            colors={["transparent", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)"]}
            style={styles.bottomGradient}
          />

          {/* BOTTOM ROW: shutter centered + palette halfway to right */}
          <View style={styles.bottomRow}>
            {/* LEFT ACTION: Close */}
            <TouchableOpacity
              style={styles.sideSlot}
              onPress={onFinish}
              accessibilityLabel="Close"
              hitSlop={10}
            >
              <Ionicons name="chevron-back" size={30} color="white" />
            </TouchableOpacity>

            {/* CENTER SHUTTER */}
            <Pressable
              onPress={capturePhoto}
              accessibilityLabel="Take photo"
              style={({ pressed }) => [
                styles.shutterOuter,
                pressed && styles.shutterPressed,
              ]}
            >
              <View style={styles.shutterInner} />
            </Pressable>

            {/* RIGHT ACTION */}
            <TouchableOpacity
              style={styles.sideSlot}
              onPress={nextOverlay}
              accessibilityLabel="Change overlay"
              hitSlop={10}
            >
              <Ionicons name="color-palette-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {mode === "preview" && image && (
        <>
          <View
            ref={snapRef}
            collapsable={false}
            style={StyleSheet.absoluteFillObject}
          >
            <Image
              source={{ uri: image.uri }}
              style={StyleSheet.absoluteFillObject}
            />
            <StickerLayer
              pack={DEFAULT_STICKER_PACK}
              registry={stickerRegistry}
            />
            <OverlayComponent preset={preset} />
          </View>

          <LinearGradient
            pointerEvents="none"
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.bottomGradient}
          />

          {/* TOP RIGHT: X (no background) */}
          {/* <View style={styles.topRight}>
            <TouchableOpacity
              onPress={onFinish}
              hitSlop={14}
              accessibilityLabel="Close"
            >
              <Ionicons name="close" size={34} color="white" />
            </TouchableOpacity>
          </View> */}

          <View style={styles.previewBottomRow}>
            <TouchableOpacity
              onPress={retake}
              hitSlop={10}
              disabled={isExporting}
              accessibilityLabel="Retake"
              style={isExporting && styles.btnDisabled}
            >
              <Ionicons name="refresh" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={nextOverlay}
              hitSlop={10}
              disabled={isExporting}
              accessibilityLabel="Change overlay"
            >
              <Ionicons name="color-palette-outline" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleStickerPicker}
              hitSlop={10}
              disabled={isExporting}
              accessibilityLabel="Add sticker"
            >
              <Ionicons name="happy-outline" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={exportShare}
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
            pack={DEFAULT_STICKER_PACK}
            onClose={closeStickerPicker}
            onSelect={addSticker}
          />
        </>
      )}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "black" },
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },

  topRight: {
    position: "absolute",
    top: 54,
    right: 16,
  },

  // --- CAMERA MODE BOTTOM ROW LAYOUT ---
  bottomRow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40, // controls spacing from screen edges
  },

  sideSlot: {
    width: 86, // match shutter width for perfect symmetry
    alignItems: "center",
    justifyContent: "center",
  },

  shutterOuter: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 4,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },

  shutterInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "white",
  },

  shutterPressed: {
    opacity: 0.7,
    // transform: [{ scale: 0.92 }],
  },

  // Shutter truly centered
  shutterCenter: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -39 }], // half of shutter size (78/2)
    alignItems: "center",
  },

  // --- PREVIEW MODE BOTTOM ROW ---
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

  hintContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 140,
    alignItems: "center",
  },

  hintBubble: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 999,
  },

  hintText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
