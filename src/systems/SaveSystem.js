import { GameState } from "../core/GameState.js";

export const SaveSystem = {
  save() {
    localStorage.setItem("cms-save", JSON.stringify(GameState));
  },

  load() {
    const data = localStorage.getItem("cms-save");

    if (!data) return;

    Object.assign(GameState, JSON.parse(data));
  },
};
