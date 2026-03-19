import { GameState } from "../core/GameState.js";
import { Part } from "../game/Part.js";
import { Inventory } from "../game/Inventory.js";
import { Notifications } from "./Notifications.js";

export const ShopUI = {
  parts: [
    {
      id: "battery_basic",
      name: "Bateria básica",
      type: "battery",
      price: 150,
    },

    {
      id: "engine_i4",
      name: "Motor I4",
      type: "engine",
      price: 800,
    },

    {
      id: "wheel_standard",
      name: "Roda padrão",
      type: "wheel",
      price: 120,
    },
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
          Notifications.show("Dinheiro insuficiente");

          return;
        }

        GameState.money -= data.price;

        Inventory.add(new Part(data));

        Notifications.show("Peça comprada");
      };

      list.appendChild(div);
    });
  },
};
