import { GameState } from "../core/GameState.js";

export const Inventory = {
  add(part) {
    GameState.inventory.push(part);
  },

  remove(part) {
    GameState.inventory = GameState.inventory.filter((p) => p !== part);
  },
};
