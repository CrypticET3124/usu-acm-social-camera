import { JSX } from "react";
export type PackId = string;
export type StickerPackRenderProps = {
  size: number;
};
export type StickerDefinition = (props: StickerPackRenderProps) => JSX.Element;
export type StickerPack = Record<PackId, StickerDefinition>;