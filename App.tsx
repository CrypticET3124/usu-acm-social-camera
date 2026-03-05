import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camerlay } from "./camera";
import {
  Overlay,
  BASIC_PRESETS,
  BASIC_STICKER_PACK,
  CameraThemeProvider,
  CAMERA_THEMES,
  useCameraTheme,
} from "./customization";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function HomeScreen({
  onOpen,
  onCycleTheme,
}: {
  onOpen: () => void;
  onCycleTheme: () => void;
}) {
  const theme = useCameraTheme();

  return (
    <View
      style={[
        styles.home,
        {
          backgroundColor: theme.surfaceColor,
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.primaryTextColor }]}>
        USU ACM Social Camera
      </Text>
      <Text style={[styles.subtitle, { color: theme.mutedTextColor }]}>
        Take a photo, add an overlay, then share it.
      </Text>

      <TouchableOpacity
        style={[
          styles.homeBtn,
          {
            backgroundColor: theme.primaryColor,
            opacity: 0.9,
          },
        ]}
        onPress={onOpen}
      >
        <Text
          style={[
            styles.homeBtnText,
            {
              color: theme.surfaceColor,
            },
          ]}
        >
          Take a picture
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.themeBtn,
          {
            borderColor: theme.mutedColor,
          },
        ]}
        onPress={onCycleTheme}
      >
        <Text style={[styles.themeBtnText, { color: theme.primaryTextColor }]}>
          Theme: {theme.name}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.smallHint, { color: theme.mutedTextColor }]}>
        In the workshop you'll customize presets, overlays, stickers, and
        themes.
      </Text>
    </View>
  );
}

export default function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const currentTheme = CAMERA_THEMES[themeIndex];

  const cycleTheme = () => {
    setThemeIndex((i) => (i + 1) % CAMERA_THEMES.length);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CameraThemeProvider value={currentTheme}>
        <View style={styles.root}>
          {!isCameraOpen ? (
            <HomeScreen
              onOpen={() => setIsCameraOpen(true)}
              onCycleTheme={cycleTheme}
            />
          ) : (
            <Camerlay
              presets={BASIC_PRESETS}
              stickerPack={BASIC_STICKER_PACK}
              OverlayComponent={Overlay}
              onFinish={() => setIsCameraOpen(false)}
            />
          )}
        </View>
      </CameraThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  home: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: "center",
    gap: 14,
  },
  title: { fontSize: 28, fontWeight: "800" },
  subtitle: { fontSize: 16, lineHeight: 22 },
  homeBtn: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  homeBtnText: { fontSize: 18, fontWeight: "800" },
  themeBtn: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
  },
  themeBtnText: {
    fontSize: 14,
    fontWeight: "700",
  },
  smallHint: { marginTop: 10 },
});
