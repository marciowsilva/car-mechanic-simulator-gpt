import UIManager from "./ui/UIManager.js";
import GarageScreen from "./ui/screens/GarageScreen.js";
import ClientScreen from "./ui/screens/ClientScreen.js";
import InventoryScreen from "./ui/screens/InventoryScreen.js";
import ShopScreen from "./ui/screens/ShopScreen.js";

import ProblemSystem from "./systems/ProblemSystem.js";
import DiagnosisSystem from "./systems/DiagnosisSystem.js";
import TestSystem from "./systems/TestSystem.js";

// =========================
// ESTADO
// =========================
const car = {
  parts: [
    { id: "battery", name: "Bateria", condition: 0.2 },
    { id: "spark_plug", name: "Vela", condition: 0.3 },
    { id: "air_filter", name: "Filtro de Ar", condition: 0.9 },
    { id: "brake_pad", name: "Freio", condition: 0.2 },
  ],
  problems: [],
};

// =========================
// SISTEMAS
// =========================
const problemSystem = new ProblemSystem();
const diagnosisSystem = new DiagnosisSystem();
const testSystem = new TestSystem();

// =========================
// UI
// =========================
const ui = new UIManager("app");

ui.register("garage", new GarageScreen());
ui.register("client", new ClientScreen());
ui.register("inventory", new InventoryScreen());
ui.register("shop", new ShopScreen());

// =========================
// INIT
// =========================
function init() {
  problemSystem.generate(car, 3);
  problemSystem.update(car);

  ui.show("garage", { car, problemSystem });
}

// =========================
// NAVEGAÇÃO
// =========================
window.navigate = function (screen) {
  ui.show(screen, { car, problemSystem });
};

// =========================
// AÇÕES
// =========================
window.repairPart = function (id) {
  const part = car.parts.find((p) => p.id === id);
  if (part) part.condition = 1;

  problemSystem.update(car);
  ui.show("garage", { car, problemSystem });
};

window.inspectCar = function () {
  diagnosisSystem.inspect(car);
  ui.show("garage", { car, problemSystem });
};

window.scanCar = function () {
  diagnosisSystem.scan(car);
  ui.show("garage", { car, problemSystem });
};

window.testEngine = function () {
  const results = testSystem.runEngineTest(car);
  alert(results.join("\n"));
};

window.testDrive = function () {
  const results = testSystem.runDriveTest(car);
  alert(results.join("\n"));
};

// =========================
// START
// =========================
init();
