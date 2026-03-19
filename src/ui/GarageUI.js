import { GameState } from "../core/GameState.js";
import { Notifications } from "./Notifications.js";

export const GarageUI = {
  render() {
    const carView = document.getElementById("car-view");

    carView.innerHTML = "";

    const car = GameState.currentCar;

    for (const slot in car.slots) {
      const part = car.slots[slot];

      const div = document.createElement("div");

      div.innerHTML = `
<b>${slot}</b>
<br>
${part ? part.name : "(vazio)"}
`;

      const btn = document.createElement("button");

      btn.innerText = "Remover";

      btn.onclick = () => {
        if (!part) return;

        GameState.inventory.push(part);

        car.remove(slot);

        Notifications.show("Peça removida");

        this.render();
      };

      div.appendChild(btn);

      carView.appendChild(div);
    }
  },
};
