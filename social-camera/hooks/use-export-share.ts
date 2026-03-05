import { useState, useRef, useCallback } from "react";
import { Alert, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

type ExportShareOptions = {
  onFinish: () => void;
};

export function useExportShare({ onFinish }: ExportShareOptions) {
  const [isExporting, setIsExporting] = useState(false);
  const snapRef = useRef<View | null>(null);

  const exportShare = useCallback(async () => {
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
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Unknown error while exporting.";
      console.error("exportShare error:", e);
      Alert.alert("Export failed", message);
    } finally {
      setIsExporting(false);
    }
  }, [isExporting, onFinish]);

  return { snapRef, exportShare, isExporting };
}
