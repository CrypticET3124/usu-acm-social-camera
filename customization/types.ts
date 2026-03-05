/**
 * Overlay preset data passed into your overlay component.
 * Edit overlay-presets.ts to change the list; edit overlays.tsx to change how it looks.
 * Optional `tags` lets you practice list rendering with .map() and keys.
 */
export type OverlayPreset = {
  emoji: string;
  caption: string;
  handle: string;
  tags?: string[];
  brandName?: string;
};

/** Props your overlay component receives from the camera screen. */
export type OverlayProps = {
  preset: OverlayPreset;
};