import {
  StickerInstance,
  StickerId,
  StickerTransform,
  StickerState,
  StickerPresent,
  Action,
} from "../types";
import { v4 as uuidv4 } from "uuid";

export const DEFAULT_TRANSFORM: StickerTransform = {
  x: 120,
  y: 220,
  scale: 1,
  rotation: 0,
};

function presentOf(state: StickerState): StickerPresent {
  const { past, future, ...present } = state;
  return present;
}

function pushHistory(state: StickerState): StickerState {
  return {
    ...state,
    past: [...state.past, presentOf(state)],
    future: [],
  };
}

function clampOrder(
  byId: Record<StickerId, StickerInstance>,
  order: StickerId[],
) {
  const filtered = order.filter((id) => !!byId[id]);

  filtered.forEach((id, idx) => {
    byId[id] = { ...byId[id], z: idx };
  });
  return filtered;
}

export const initialState: StickerState = {
  byId: {},
  order: [],
  selectedId: null,
  past: [],
  future: [],
};

export function reducer(state: StickerState, action: Action): StickerState {
  switch (action.type) {
    case "ADD": {
      const id = uuidv4();
      const transform: StickerTransform = {
        ...DEFAULT_TRANSFORM,
        ...(action.initialTransform ?? {}),
      };
      const z = state.order.length;

      const next: StickerState = pushHistory(state);
      next.byId = {
        ...next.byId,
        [id]: { id, packId: action.packId, transform, z },
      };
      next.order = [...next.order, id];
      next.selectedId = id;
      return next;
    }

    case "UPDATE": {
      const sticker = state.byId[action.id];
      if (!sticker) {
        console.warn(`Sticker with id "${action.id}" does not exist.`);
        return state;
      }

      // If commit = false, do not write to history (for live dragging)
      const base = action.commit === false ? state : pushHistory(state);

      return {
        ...base,
        byId: {
          ...base.byId,
          [action.id]: {
            ...sticker,
            transform: {
              ...sticker.transform,
              ...action.patch,
            },
          },
        },
      };
    }

    case "COMMIT": {
      return pushHistory(state);
    }

    case "REMOVE": {
      const sticker = state.byId[action.id];
      if (!sticker) return state;

      const next = pushHistory(state);
      const byId = { ...next.byId };
      delete byId[action.id];

      const order = clampOrder(
        byId,
        next.order.filter((id) => id !== action.id),
      );
      const selectedId = next.selectedId === action.id ? null : next.selectedId;

      return {
        ...next,
        byId,
        order,
        selectedId,
      };
    }

    case "SELECT":
      return { ...state, selectedId: action.id };

    case "BRING_TO_FRONT": {
      if (!state.byId[action.id]) return state;

      const next = pushHistory(state);
      const order = next.order.filter((id) => id !== action.id);
      order.push(action.id);

      const byId = { ...next.byId };
      clampOrder(byId, order);

      return { ...next, order, byId, selectedId: action.id };
    }

    case "UNDO": {
      if (state.past.length === 0) return state;

      const previous = state.past[state.past.length - 1];
      const past = state.past.slice(0, -1);
      return {
        ...previous,
        past,
        future: [presentOf(state), ...state.future],
      };
    }

    case "REDO": {
      if (state.future.length === 0) return state;
      const nextPresent = state.future[0];
      const future = state.future.slice(1);
      return {
        ...nextPresent,
        past: [...state.past, presentOf(state)],
        future,
      };
    }

    case "RESET": {
      return initialState;
    }

    default:
      return state;
  }
}
