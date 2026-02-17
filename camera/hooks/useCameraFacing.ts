import { useCallback, useState } from "react";
import type { CameraDirection } from "../types";

export function useCameraFacing(initial: CameraDirection = "back") {
  const [facing, setFacing] = useState<CameraDirection>(initial);

  const toggleFacing = useCallback(
    () => setFacing((current) => (current === "back" ? "front" : "back")),
    [],
  );

  return { facing, toggleFacing };
}
