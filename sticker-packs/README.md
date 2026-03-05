# Sticker Packs (workshop layer)

This folder contains sticker pack definitions — custom stickers that students can place on photos in the camera app.

## What's in here

| File/Folder | Purpose |
|-------------|---------|
| **default.tsx** | The default sticker pack with emoji, image, and custom component stickers. |
| **stickers/** | Reusable sticker components (e.g. `LikeButtonSticker`, `ReactionBadgeSticker`). |
| **index.ts** | Re-exports all sticker packs so they can be imported from `./sticker-packs`. |

## Quick edits

- **Add emoji stickers** → Add key-value pairs like `"fire": () => "🔥"` to the `default` pack.
- **Add image stickers** → Use `require("../../assets/...")` to load images, then return `<Image />` from a render function.
- **Add custom component stickers** → Create a new component in `stickers/` and import it into `default.tsx`.
- **Use theme colors in stickers** → Import `useTheme` from `../theme` and call it in your sticker component.

## What you'll learn

### 1. **Sticker pack structure**
   - Sticker packs are objects where keys are sticker IDs and values are render functions: `({ size }) => ReactElement`.
   - Each sticker is rendered with a given `size` prop (48 by default).

### 2. **Component composition & props**
   - Build custom sticker components (see `LikeButtonSticker`, `ReactionBadgeSticker`).
   - Pass data via props (`StickerPackRenderProps` has `size: number`).

### 3. **State management (useState)**
   - `LikeButtonSticker` demonstrates local state with `useState`.
   - Try building your own stateful stickers (counters, toggles, timers, etc.).

### 4. **Theming & design systems**
   - Stickers can use `useTheme()` to adapt to the current theme (see `ReactionBadgeSticker`).
   - Theme colors are reusable: `primaryColor`, `secondaryColor`, `surfaceColor`, `mutedColor` (+ text variants).

### 5. **TypeScript types**
   - `StickerPack`, `StickerPackRenderProps` — practice defining and using types.

## Dependencies

- Sticker types are defined in **`../stickers/types.ts`** (the sticker engine).
- Theme values come from **`../theme/`** and flow through `ThemeProvider` → `useTheme()` → sticker components.
- Image assets (e.g. for image stickers) can use `require("../../assets/...")` to reference the project's `assets/` folder.
