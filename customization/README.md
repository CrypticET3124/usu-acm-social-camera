# Customization (workshop layer)

This folder is the main place to edit the app during the workshop. All changes here affect how the social camera looks and behaves without touching camera or sticker logic.

## What's in here

| File | Purpose |
|------|--------|
| **types.ts** | `OverlayPreset` and `OverlayProps` — types for overlay data and overlay component props. |
| **overlay-presets.ts** | List of overlay presets (emoji, caption, handle, tags). Add or edit entries to change the text options. |
| **overlays.tsx** | `BasicOverlay` component — the UI drawn on top of the photo (card, handle, caption, tags). Edit or replace to change the overlay design. |
| **sticker-packs.tsx** | `BASIC_STICKER_PACK` — sticker definitions (emojis, images, or custom components). Add keys and render functions to add stickers. |
| **themes.ts** | `CAMERA_THEMES` array — named theme objects (colors, brand name). Add new themes or edit existing ones. |
| **camera-theme.tsx** | `CameraTheme` type, `CameraThemeProvider`, and `useCameraTheme` hook — theme system for overlays and stickers. |
| **index.ts** | Re-exports everything so `App.tsx` can import from `./customization`. |

## Quick edits

- **Change overlay text** → Edit the objects in `overlay-presets.ts` (emoji, caption, handle, tags).
- **Change overlay layout/colors** → Edit `BasicOverlay` in `overlays.tsx` (uses `useCameraTheme()` to access theme colors).
- **Add stickers** → Add new entries to the object in `sticker-packs.tsx`; each value is a function `({ size }) => <YourSticker />`.
- **Add or edit themes** → Edit the `CAMERA_THEMES` array in `themes.ts`. Each theme controls all overlay and sticker colors.

## What you'll learn

### 1. **Component composition & props**
   - Build custom overlay and sticker components.
   - Pass data via props (`OverlayProps`, `StickerPackRenderProps`).

### 2. **React Context & hooks**
   - Use `useCameraTheme()` to consume theme values in any component.
   - See how `CameraThemeProvider` wraps the app and provides theme to overlays/stickers.

### 3. **State management (useState)**
   - `LikeButtonSticker` in `sticker-packs.tsx` demonstrates local state with `useState`.
   - Try building your own stateful stickers (counters, toggles, etc.).

### 4. **List rendering & keys**
   - `BasicOverlay` maps over `preset.tags` to render tag pills.
   - Practice `.map()`, unique keys, and conditional rendering.

### 5. **Theming & design systems**
   - Every color/style in the overlay is driven by semantic theme colors.
   - Theme colors are reusable: `primaryColor`, `secondaryColor`, `surfaceColor`, `mutedColor` (+ text variants).
   - Edit `themes.ts` to create new themes (dark mode, light mode, neon, etc.).
   - Switch themes on the home screen and see changes instantly in the camera.
   - Stickers can also use `useCameraTheme()` to adapt to the current theme (see `ReactionBadgeSticker`).

### 6. **TypeScript types**
   - `CameraTheme`, `OverlayPreset`, `StickerPack` — practice defining and using types.

## Dependencies

- Overlay and preset types are defined in **types.ts** (this folder). The camera screen imports them from the customization barrel.
- Theme values come from **themes.ts** and flow through `CameraThemeProvider` → `useCameraTheme()` → overlay/sticker components.
- Image assets (e.g. for overlays or stickers) can use `require("../assets/...")` to reference the project's `assets/` folder.
