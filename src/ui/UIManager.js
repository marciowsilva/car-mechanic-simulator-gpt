import { GameState } from "../core/GameState.js";

export const UIManager = {
  updateMoney() {
    const el = document.getElementById("money");

    el.innerText = GameState.money;
  },
};
