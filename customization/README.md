# Customization (workshop layer)

This folder is the main place to edit the app during the workshop. All changes here affect how the social camera looks and behaves without touching camera or sticker logic.

## What’s in here

| File | Purpose |
|------|--------|
| **types.ts** | `OverlayPreset` and `OverlayProps` — types for overlay data and overlay component props. |
| **overlay-presets.ts** | List of overlay presets (emoji, caption, handle). Add or edit entries to change the text options. |
| **overlays.tsx** | `BasicOverlay` component — the UI drawn on top of the photo (card, handle, caption). Edit or replace to change the overlay design. |
| **sticker-packs.tsx** | `BASIC_STICKER_PACK` — sticker definitions (emojis, images, or custom components). Add keys and render functions to add stickers. |
| **index.ts** | Re-exports everything so `App.tsx` can import from `./customization`. |

## Quick edits

- **Change overlay text** → Edit the objects in `overlay-presets.ts`.
- **Change overlay layout/colors** → Edit `BasicOverlay` in `overlays.tsx` (or create a new component and use it in `App.tsx`).
- **Add stickers** → Add new entries to the object in `sticker-packs.tsx`; each value is a function `({ size }) => <YourSticker />`.

## Dependencies

- Overlay and preset types are defined in **types.ts** (this folder). The camera screen imports them from the customization barrel.
- Image assets (e.g. for overlays) can use `require("../assets/...")` to reference the project’s `assets/` folder.
