# USU ACM Social Camera

A modular Expo/React Native app that lets users take a photo, apply an overlay, drop stickers, and share. The code is split into workshop-friendly layers so attendees can customize visuals without touching core camera logic.

## Structure

- `camera/` — self-contained camera experience (screen orchestrator, panes, hooks, types). See `camera/README.md`.
- `stickers/` — sticker state machine and rendering (registry reducer, types, `StickerLayer`).
- `overlays/` — overlay components and presets intended for workshop edits. See `overlays/README.md`.
- `sticker-packs/` — sticker pack definitions and custom sticker components. See `sticker-packs/README.md`.
- `theme/` — theme provider, theme types, and theme definitions (colors, styles).
- `App.tsx` — wires everything together and manages theme switching.
- `index.ts` — Expo entrypoint.

## Getting started

1. Install deps: `npm install` (or `pnpm install` / `yarn install`).
2. Run the app: `npx expo start` and use Expo Go or an emulator/simulator.
3. Open `App.tsx` to swap overlays/presets/packs from the `overlays` and `sticker-packs` barrels.

## Customizing (workshop quickstart)

- **Change overlay text/content**: edit `overlays/presets.ts`.
- **Change overlay visuals**: tweak or replace `BasicOverlay` in `overlays/components/basic.tsx`.
- **Add stickers**: update `sticker-packs/default.tsx`.
- **Change themes**: edit `theme/themes.ts` to add or modify color themes.
- Everything re-exports via barrel files (`index.ts`) for simple imports.

## Behavior notes

- Swipe on the camera view to flip front/back; tap shows a "Swipe to flip" hint.
- Front camera captures are mirrored for selfie expectations.
- Retake clears the sticker registry so previews start clean.
- Sharing uses `expo-sharing`; availability is checked at runtime.
- Theme switching is available on the home screen and affects all overlays, stickers, and UI.

## Tech stack

- Expo + React Native
- `expo-camera` for capture
- `expo-sharing` + `react-native-view-shot` for export/share
- `react-native-gesture-handler` for gestures

## Contributing checklist

- Keep camera logic in `camera/hooks` and UI in `camera/components`.
- Expose new customization points through the `overlays` and `sticker-packs` barrels.
- Use semantic theme colors from `theme/` for all styling (avoid hardcoded colors).
