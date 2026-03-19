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

const car = new Car("Carro do Cliente");

car.install(
  "engine",
  new Part({
    id: "engine",
    name: "Motor",
    type: "engine",
    price: 800,
    condition: Math.random() < 0.5 ? 0 : 100,
  }),
);

car.install(
  "battery",
  new Part({
    id: "battery",
    name: "Bateria",
    type: "battery",
    price: 150,
    condition: Math.random() < 0.5 ? 0 : 100,
  }),
);

car.install(
  "wheelFL",
  new Part({
    id: "wheel",
    name: "Roda",
    type: "wheel",
    price: 120,
    condition: Math.random() < 0.5 ? 0 : 100,
  }),
);

GameState.currentCar = car;

JobSystem.createJob();

const problemSystem = new ProblemSystem();

problemSystem.generateProblems(car, 3);

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
