import { JSX } from "react";

export type StickerId = string;
export type PackId = string;

export type StickerTransform = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

export type StickerInstance = {
  id: StickerId;
  packId: PackId;
  transform: StickerTransform;
  z: number;
};

export type StickerPackRenderProps = {
  size: number;
};

export type StickerDefinition = (props: StickerPackRenderProps) => JSX.Element;

export type StickerPack = Record<PackId, StickerDefinition>;

export type StickerPresent = {
  byId: Record<StickerId, StickerInstance>;
  order: StickerId[];
  selectedId: StickerId | null;
};

export type StickerState = StickerPresent & {
  past: StickerPresent[];
  future: StickerPresent[];
};

export type Action =
  | {
      type: "ADD";
      packId: PackId;
      initialTransform?: Partial<StickerTransform>;
    }
  | {
      type: "UPDATE";
      id: StickerId;
      patch: Partial<StickerTransform>;
      commit?: boolean;
    }
  | { type: "COMMIT" }
  | { type: "REMOVE"; id: StickerId }
  | { type: "SELECT"; id: StickerId | null }
  | { type: "BRING_TO_FRONT"; id: StickerId }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "RESET" };
