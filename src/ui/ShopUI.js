import { GameState } from "../core/GameState.js";
import { Inventory } from "../game/Inventory.js";
import { Part } from "../game/Part.js";
import { Notifications } from "./Notifications.js";

export const ShopUI = {
  parts: [
    { id: "battery", name: "Bateria", type: "battery", price: 150 },
    { id: "engine", name: "Motor", type: "engine", price: 800 },
    { id: "wheel", name: "Roda", type: "wheel", price: 120 },
  ],

  render() {
    const list = document.getElementById("shop-list");
    list.innerHTML = "";

    this.parts.forEach((data) => {
      const div = document.createElement("div");

      div.innerHTML = `
            ${data.name} - $${data.price}
            <button>Comprar</button>
            `;

      div.querySelector("button").onclick = () => {
        if (GameState.money < data.price) {
          Notifications.show("Sem dinheiro");
          return;
        }

        GameState.money -= data.price;

        Inventory.add(new Part(data));

        Notifications.show("Comprado");
      };

      list.appendChild(div);
    });
  },
};
