import { GameState } from "../core/GameState.js";
import { Notifications } from "./Notifications.js";
import { Tools } from "../game/Tools.js";
import { ToolRules } from "../game/toolRules.js";
import { DependencySystem } from "../game/DependencySystem.js";

export const GarageUI = {
  render() {
    const carView = document.getElementById("car-view");
    carView.innerHTML = "";

    const car = GameState.currentCar;

    for (const slot in car.slots) {
      const part = car.slots[slot];

      const div = document.createElement("div");

      div.innerHTML = `
            <b>${slot}</b><br>
            ${part ? part.name : "(vazio)"}
            `;

      // 🔍 BOTÃO INSPECIONAR
      const inspectBtn = document.createElement("button");
      inspectBtn.innerText = "Inspecionar";

      inspectBtn.onclick = () => {
        if (!part) {
          Notifications.show("Sem peça aqui");
          return;
        }

        if (part.condition <= 0) {
          Notifications.show(`${part.name} está QUEBRADA`);
        } else {
          Notifications.show(`${part.name} está OK`);
        }
      };

      // 🔧 BOTÃO REMOVER
      const removeBtn = document.createElement("button");
      removeBtn.innerText = "Remover";

      removeBtn.onclick = () => {
        if (!part) return;

        const requiredTool = ToolRules[slot];

        // 🔧 valida ferramenta
        if (Tools.selected !== requiredTool) {
          Notifications.show("Ferramenta errada!");
          return;
        }

        // 🔥 valida dependência
        const check = DependencySystem.canRemove(car, slot);

        if (!check.allowed) {
          Notifications.show("Remova primeiro: " + check.blocking);

          return;
        }

        GameState.inventory.push(part);
        car.remove(slot);

        Notifications.show("Peça removida");

        this.render();
      };

      div.appendChild(inspectBtn);
      div.appendChild(removeBtn);

      carView.appendChild(div);
    }

    function updateToolUI() {
      document.getElementById("current-tool").innerText =
        "Atual: " + Tools.selected;
    }
    updateToolUI();

    if (part && part.condition <= 0) {
      div.style.color = "red";
    }
  },
};
