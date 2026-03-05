# Overlays (workshop layer)

This folder contains overlay components and presets for the social camera app. Students can edit these files to customize how photos look when captured.

## What's in here

| File/Folder | Purpose |
|-------------|---------|
| **types.ts** | `OverlayPreset` and `OverlayProps` — types for overlay data and overlay component props. |
| **presets.ts** | List of overlay presets (emoji, caption, handle, tags, brandName). Add or edit entries to change the text options. |
| **components/default.tsx** | `DefaultOverlay` component — the UI drawn on top of the photo (card, handle, caption, tags). Edit or replace to change the overlay design. |
| **index.ts** | Re-exports everything so `App.tsx` can import from `./overlays`. |

## Quick edits

- **Change overlay text** → Edit the objects in `presets.ts` (emoji, caption, handle, tags, brandName).
- **Change overlay layout/colors** → Edit `DefaultOverlay` in `components/default.tsx` (uses `useTheme()` to access theme colors).
- **Add a new overlay layout** → Create a new component in `components/` (e.g. `compact.tsx`) and use it in `App.tsx`.

## What you'll learn

### 1. **Component composition & props**
   - Build custom overlay components.
   - Pass data via props (`OverlayProps`).

### 2. **React Context & hooks**
   - Use `useTheme()` to consume theme values in any component.
   - See how `ThemeProvider` wraps the app and provides theme to overlays.

### 3. **List rendering & keys**
   - `DefaultOverlay` maps over `preset.tags` to render tag pills.
   - Practice `.map()`, unique keys, and conditional rendering.

### 4. **Theming & design systems**
   - Every color/style in the overlay is driven by semantic theme colors.
   - Theme colors are reusable: `primaryColor`, `secondaryColor`, `surfaceColor`, `mutedColor` (+ text variants).
   - Switch themes on the home screen and see changes instantly in the camera.

### 5. **TypeScript types**
   - `OverlayPreset`, `OverlayProps` — practice defining and using types.

## Dependencies

- Overlay and preset types are defined in **types.ts** (this folder).
- Theme values come from **`../theme/`** and flow through `ThemeProvider` → `useTheme()` → overlay components.
- Image assets (e.g. for overlays) can use `require("../assets/...")` to reference the project's `assets/` folder.
