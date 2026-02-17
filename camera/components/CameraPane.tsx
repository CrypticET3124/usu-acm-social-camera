import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Text,
} from "react-native";
import { CameraView } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import type { CameraDirection, OverlayPreset } from "../types";
import type { CameraView as CameraViewType } from "expo-camera";

type Props = {
  cameraRef: React.RefObject<CameraViewType | null>;
  facing: CameraDirection;
  preset: OverlayPreset;
  OverlayComponent: React.ComponentType<{ preset: OverlayPreset }>;
  panHandlers: any;
  showHint: boolean;
  onCapture: () => void;
  onClose: () => void;
  onNextOverlay: () => void;
};

export function CameraPane({
  facing,
  preset,
  OverlayComponent,
  panHandlers,
  showHint,
  onCapture,
  onClose,
  onNextOverlay,
  cameraRef,
}: Props) {
  return (
    <>
      <View style={StyleSheet.absoluteFill} {...panHandlers}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing={facing}
          animateShutter={false}
          autofocus="on"
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

      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.sideSlot}
          onPress={onClose}
          accessibilityLabel="Close"
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>

        <Pressable
          onPress={onCapture}
          accessibilityLabel="Take photo"
          style={({ pressed }) => [
            styles.shutterOuter,
            pressed && styles.shutterPressed,
          ]}
        >
          <View style={styles.shutterInner} />
        </Pressable>

        <TouchableOpacity
          style={styles.sideSlot}
          onPress={onNextOverlay}
          accessibilityLabel="Change overlay"
          hitSlop={10}
        >
          <Ionicons name="color-palette-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },

  sideSlot: {
    width: 86,
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
  },

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
