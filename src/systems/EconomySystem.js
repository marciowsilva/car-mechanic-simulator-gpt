import { GameState } from "../core/GameState.js";

export const EconomySystem = {
  addMoney(amount) {
    GameState.money += amount;
  },

  spendMoney(amount) {
    if (GameState.money < amount) {
      return false;
    }

    GameState.money -= amount;

    return true;
  },
};
