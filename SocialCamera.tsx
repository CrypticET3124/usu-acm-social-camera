import { StatusBar } from "expo-status-bar";
import { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { CameraCapturedPicture, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import useCameraReady from "./useCameraReady";
import { LinearGradient } from "expo-linear-gradient";

export type OverlayPreset = {
  emoji: string;
  caption: string;
  handle: string;
};

type Mode = "camera" | "preview";

export default function SocialCamera({
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
  const [isExporting, setIsExporting] = useState(false);

  const cameraRef = useRef<CameraView>(null);
  const snapRef = useRef<View>(null);

  const preset = useMemo(() => {
    if (presets.length === 0)
      return { emoji: "✨", caption: "No presets", handle: "@you" };
    return presets[presetIndex % presets.length];
  }, [presets, presetIndex]);

  const nextOverlay = () =>
    setPresetIndex((i) => (i + 1) % Math.max(1, presets.length));

  const capturePhoto = async () => {
    if (!cameraRef.current) return;
    const pic = await cameraRef.current.takePictureAsync();
    if (!pic?.uri) return;
    setImage(pic);
    setMode("preview");
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
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} />
          <OverlayComponent preset={preset} />
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

          {/* Bottom row mirrors camera mode (shutter replaced by actions) */}
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
});
