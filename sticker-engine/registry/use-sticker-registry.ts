import { useCallback, useMemo, useReducer } from "react";
import { initialState, reducer } from "./internal";
import { StickerId, StickerTransform, PackName } from "../types";

export function useStickerRegistry() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => {
    return {
      add(packId: PackName, initialTransform?: Partial<StickerTransform>) {
        dispatch({ type: "ADD", packId, initialTransform });
      },
      select(id: StickerId | null) {
        dispatch({ type: "SELECT", id });
      },
      bringToFront(id: StickerId) {
        dispatch({ type: "BRING_TO_FRONT", id });
      },
      remove(id: StickerId) {
        dispatch({ type: "REMOVE", id });
      },
      undo() {
        dispatch({ type: "UNDO" });
      },
      redo() {
        dispatch({ type: "REDO" });
      },
      setTransform(
        id: StickerId,
        patch: Partial<StickerTransform>,
        commit?: boolean,
      ) {
        dispatch({ type: "UPDATE", id, patch, commit });
      },
      commit() {
        dispatch({ type: "COMMIT" });
      },
      reset() {
        dispatch({ type: "RESET" });
      },
    };
  }, []);

  const getOrderedStickers = useCallback(() => {
    return state.order.map((id) => state.byId[id]).filter(Boolean);
  }, [state.order, state.byId]);

  return { state, actions, getOrderedStickers };
}

export type StickerRegistry = ReturnType<typeof useStickerRegistry>;
