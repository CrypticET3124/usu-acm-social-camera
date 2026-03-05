/**
 * Overlay preset data passed into your overlay component.
 * Edit overlay-presets.ts to change the list; edit overlays.tsx to change how it looks.
 */
export type OverlayPreset = {
  emoji: string;
  caption: string;
  handle: string;
};

/** Props your overlay component receives from the camera screen. */
export type OverlayProps = {
  preset: OverlayPreset;
};
