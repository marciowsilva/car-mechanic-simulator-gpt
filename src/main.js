import { GameState } from "./core/GameState.js";
import { Car } from "./game/Car.js";
import { Part } from "./game/Part.js";
import { Tools } from "./game/Tools.js";

import { GarageUI } from "./ui/GarageUI.js";
import { InventoryUI } from "./ui/InventoryUI.js";
import { ShopUI } from "./ui/ShopUI.js";
import { JobUI } from "./ui/JobUI.js";

import { JobSystem } from "./systems/JobSystem.js";
import { ProblemSystem } from "./systems/ProblemSystem.js";

const problemSystem = new ProblemSystem();

// exemplo de carro (ajuste pro seu real)
const car = {
  parts: [
    { id: "battery", condition: 0.2 },
    { id: "spark_plug", condition: 0.3 },
    { id: "air_filter", condition: 0.9 },
    { id: "brake_pad", condition: 0.2 },
    { id: "oil_filter", condition: 0.6 },
  ],
};

// gera problemas
problemSystem.generate(car, 3);

// mostra problemas
problemSystem.debug(car);

// simula reparo
car.parts.find((p) => p.id === "battery").condition = 1;

// atualiza estado
problemSystem.update(car);

// mostra novamente
problemSystem.debug(car);

// verifica fim
if (problemSystem.isFixed(car)) {
  console.log("Carro consertado!");
} else {
  console.log("Ainda há problemas...");
}

// recompensa
console.log("Pagamento:", problemSystem.getReward(car));

GameState.currentCar = car;

JobSystem.createJob();

function updateMoney() {
  document.getElementById("money-value").innerText = GameState.money;
}

function render() {
  updateMoney();

  GarageUI.render();
  InventoryUI.render();
  ShopUI.render();
  JobUI.render();
}

setInterval(render, 300);
window.selectTool = (tool) => Tools.select(tool);
