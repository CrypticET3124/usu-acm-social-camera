# USU ACM Social Camera

A modular Expo/React Native app that lets users take a photo, apply an overlay, drop stickers, and share. The code is split into three workshop-friendly layers so attendees can customize visuals without touching core camera logic.

## Structure

- `camera/` — self-contained camera experience (screen orchestrator, panes, hooks, types). See `camera/README.md`.
- `stickers/` — sticker state machine and rendering (registry reducer, types, `StickerLayer`).
- `customization/` — presets, overlays, and sticker packs intended for workshop edits. See `customization/README.md`.
- `App.tsx` — wires the customization layer into `SocialCamera`.
- `index.ts` — Expo entrypoint.

## Getting started

1. Install deps: `npm install` (or `pnpm install` / `yarn install`).
2. Run the app: `npx expo start` and use Expo Go or an emulator/simulator.
3. Open `App.tsx` to swap overlays/presets/packs from the `customization` barrel.

## Customizing (workshop quickstart)

- Change overlay text/content: edit `customization/overlay-presets.ts`.
- Change overlay visuals: tweak or replace `BasicOverlay` in `customization/overlays.tsx`.
- Add stickers: update `customization/sticker-packs.tsx`.
- Everything re-exports via `customization/index.ts` for simple imports.

## Behavior notes

- Swipe on the camera view to flip front/back; tap shows a “Swipe to flip” hint.
- Front camera captures are mirrored for selfie expectations.
- Retake clears the sticker registry so previews start clean.
- Sharing uses `expo-sharing`; availability is checked at runtime.

## Tech stack

- Expo + React Native
- `expo-camera` for capture
- `expo-sharing` + `react-native-view-shot` for export/share
- `react-native-gesture-handler` for gestures

## Contributing checklist

- Keep camera logic in `camera/hooks` and UI in `camera/components`.
- Expose new customization points through the `customization` barrel.
