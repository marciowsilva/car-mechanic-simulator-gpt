import UIManager from "./ui/UIManager.js";
import GarageScreen from "./ui/screens/GarageScreen.js";
import ClientScreen from "./ui/screens/ClientScreen.js";
import InventoryScreen from "./ui/screens/InventoryScreen.js";
import ShopScreen from "./ui/screens/ShopScreen.js";

import ProblemSystem from "./systems/ProblemSystem.js";
import DiagnosisSystem from "./systems/DiagnosisSystem.js";
import TestSystem from "./systems/TestSystem.js";
import JobSystem from "./systems/JobSystem.js";
import InventorySystem from "./systems/InventorySystem.js";
import ShopSystem from "./systems/ShopSystem.js";

// =========================
// 🚗 ESTADO DO JOGO
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
// ⚙️ SISTEMAS
// =========================
const problemSystem = new ProblemSystem();
const diagnosisSystem = new DiagnosisSystem();
const testSystem = new TestSystem();
const jobSystem = new JobSystem(problemSystem);
let money = 0;
window.money = money;

const inventory = new InventorySystem();
const shop = new ShopSystem(inventory);

// =========================
// 🖥️ UI MANAGER
// =========================
const ui = new UIManager("app");

ui.register("garage", new GarageScreen());
ui.register("client", new ClientScreen());
ui.register("inventory", new InventoryScreen());
ui.register("shop", new ShopScreen());
ui.register("inventory", new InventoryScreen());
ui.register("shop", new ShopScreen());

// =========================
// 🚀 INICIALIZAÇÃO
// =========================
function init() {
  problemSystem.generate(car, 3);
  problemSystem.update(car);

  ui.show("client", { jobSystem });
}

// =========================
// 🔄 NAVEGAÇÃO
// =========================
window.navigate = function (screen) {
  ui.show(screen, { car, problemSystem, jobSystem, inventory, shop });
};

// =========================
// 🔧 AÇÕES DO JOGO
// =========================
window.repairPart = function (id) {
  const part = car.parts.find((p) => p.id === id);

  if (!part) return;

  part.condition = 1;

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

window.generateJob = function () {
  jobSystem.generateJob();
  ui.show("client", { jobSystem });
};

window.acceptJob = function () {
  jobSystem.acceptJob(car);
  ui.show("garage", { car, problemSystem, jobSystem });
};

window.completeJob = function () {
  const success = jobSystem.completeJob(car);

  if (success) {
    money += jobSystem.currentJob.reward;
    window.money = money;

    alert("Serviço concluído! 💰");
    jobSystem.currentJob = null;
  } else {
    alert("Ainda há problemas no carro!");
  }

  ui.show("client", { jobSystem });
};

window.buyPart = function (id) {
  shop.buy(id);
  ui.show("shop", { shop });
};

window.installPart = function (id) {
  if (!inventory.has(id)) {
    alert("Você não tem essa peça!");
    return;
  }

  const part = car.parts.find((p) => p.id === id);

  if (!part) return;

  inventory.remove(id);
  part.condition = 1;

  problemSystem.update(car);

  ui.show("garage", { car, problemSystem, inventory });
};

// =========================
// ▶️ START
// =========================
init();
