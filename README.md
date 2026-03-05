# USU ACM Social Camera

A modular Expo/React Native app that lets users take a photo, apply an overlay, drop stickers, and share. The code is split into workshop-friendly layers so attendees can customize visuals without touching core camera/sticker engine logic.

## Structure

- **`/camerlay`** — Camera engine (screen orchestrator, panes, hooks, types)
  - **`/overlays`** — Workshop overlay components and presets (see `camerlay/overlays/README.md`)
- **`/sticker-engine`** — Sticker state machine and rendering (registry, hooks, components, types)
  - **`/packs`** — Workshop sticker pack definitions and custom stickers (see `sticker-engine/packs/README.md`)
- **`/theme`** — Shared theming system (provider, types, theme definitions)
- **`App.tsx`** — Wires everything together and manages theme switching
- **`index.ts`** — Expo entrypoint

## Getting started

1. Install deps: `npm install` (or `pnpm install` / `yarn install`)
2. Run the app: `npx expo start` and use Expo Go or an emulator/simulator
3. Open `App.tsx` to swap overlays/presets/packs

## Customizing (workshop quickstart)

- **Change overlay text/content**: edit `camerlay/overlays/presets.ts`
- **Change overlay visuals**: tweak or replace `Default` in `camerlay/overlays/components/default.tsx`
- **Add stickers**: update `sticker-engine/packs/default.tsx`
- **Change themes**: edit `theme/themes.ts` to add or modify color themes
- Everything re-exports via barrel files (`index.ts`) for simple imports

## Behavior notes

- Swipe on the camera view to flip front/back; tap shows a "Swipe to flip" hint
- Front camera captures are mirrored for selfie expectations
- Retake clears the sticker registry so previews start clean
- Sharing uses `expo-sharing`; availability is checked at runtime
- Theme switching is available on the home screen and affects all overlays, stickers, and UI

## Tech stack

- Expo + React Native
- `expo-camera` for capture
- `expo-sharing` + `react-native-view-shot` for export/share
- `react-native-gesture-handler` for gestures

## Contributing checklist

- Keep camera logic in `camerlay/hooks` and UI in `camerlay/components`
- Keep sticker engine logic separate from sticker pack content
- Expose workshop customizations through `camerlay/overlays` and `sticker-engine/packs`
- Use semantic theme colors from `theme/` for all styling (avoid hardcoded colors)
