import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import { useCameraPermissions } from "expo-camera";

export default function useCameraReady(onDenied?: () => void) {
  const [camPerm, requestCamPerm] = useCameraPermissions();

  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // Already granted
        if (camPerm?.granted) {
          setReady(true);
          return;
        }

        // Request permission
        const res = await requestCamPerm();

        if (!res.granted) {
          Alert.alert(
            "Camera permission needed",
            "Camera access is required to take pictures.",
            [
              { text: "Cancel", style: "cancel", onPress: onDenied },
              { text: "Open Settings", onPress: () => Linking.openSettings() },
            ],
          );
          return;
        }

        setReady(true);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [camPerm, requestCamPerm, onDenied]);

  return { ready, loading };
}
