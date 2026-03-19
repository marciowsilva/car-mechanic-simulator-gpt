import { GameState } from "./core/GameState.js";
import { Car } from "./game/Car.js";
import { Part } from "./game/Part.js";
import { Inventory } from "./game/Inventory.js";

import { GarageUI } from "./ui/GarageUI.js";
import { InventoryUI } from "./ui/InventoryUI.js";
import { ShopUI } from "./ui/ShopUI.js";
import { JobUI } from "./ui/JobUI.js";

import { JobSystem } from "./systems/JobSystem.js";
import { SaveSystem } from "./systems/SaveSystem.js";

SaveSystem.load();

GameState.currentCar = new Car("Carro do Cliente");

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

  SaveSystem.save();
}

setInterval(render, 500);
