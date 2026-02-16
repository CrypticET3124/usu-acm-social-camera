import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SocialCamera, { type OverlayPreset } from "./SocialCamera";
import Overlay from "./Overlay";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PRESETS: OverlayPreset[] = [
  { emoji: "🔥", caption: "My first social app", handle: "@usu_acm" },
  { emoji: "😂", caption: "Built this in 1 hour", handle: "@spencerls_" },
  { emoji: "😎", caption: "Camera + overlays = instant W", handle: "@you" },
];

export default function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.root}>
        {!isCameraOpen ? (
          <View style={styles.home}>
            <Text style={styles.title}>USU ACM Social Camera</Text>
            <Text style={styles.subtitle}>
              Take a photo, add an overlay, then share it.
            </Text>

            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => setIsCameraOpen(true)}
            >
              <Text style={styles.homeBtnText}>Take a picture</Text>
            </TouchableOpacity>

            <Text style={styles.smallHint}>
              In the workshop you’ll customize presets + the overlay UI.
            </Text>
          </View>
        ) : (
          <SocialCamera
            presets={PRESETS}
            OverlayComponent={Overlay}
            onFinish={() => setIsCameraOpen(false)}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "black" },
  home: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: "center",
    gap: 14,
  },
  title: { color: "white", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 22 },
  homeBtn: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
  },
  homeBtnText: { color: "white", fontSize: 18, fontWeight: "800" },
  smallHint: { color: "rgba(255,255,255,0.55)", marginTop: 10 },
});
