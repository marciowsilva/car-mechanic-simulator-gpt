import { GameState } from "../core/GameState.js";

export const Inventory = {
  add(part) {
    GameState.inventory.push(part);
  },

  remove(id) {
    GameState.inventory = GameState.inventory.filter((p) => p.id !== id);
  },

  getAll() {
    return GameState.inventory;
  },
};
