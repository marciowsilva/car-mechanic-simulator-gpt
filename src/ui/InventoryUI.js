import { GameState } from "../core/GameState.js";
import { GarageUI } from "./GarageUI.js";

export const InventoryUI = {
  render() {
    const list = document.getElementById("inventory-list");

    list.innerHTML = "";

    GameState.inventory.forEach((part) => {
      const div = document.createElement("div");

      div.innerHTML = `
${part.name}
<button>Instalar</button>
`;

      div.querySelector("button").onclick = () => {
        const car = GameState.currentCar;

        for (const slot in car.slots) {
          if (car.slots[slot] == null && slot.startsWith(part.type)) {
            car.install(slot, part);

            GameState.inventory = GameState.inventory.filter((p) => p !== part);

            GarageUI.render();
            this.render();

            break;
          }
        }
      };

      list.appendChild(div);
    });
  },
};
