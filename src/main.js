// =========================
// 🖥️ UI
// =========================
import UIManager from "./ui/UIManager.js";
import GarageScreen from "./ui/screens/GarageScreen.js";
import ClientScreen from "./ui/screens/ClientScreen.js";
import InventoryScreen from "./ui/screens/InventoryScreen.js";
import ShopScreen from "./ui/screens/ShopScreen.js";

// =========================
// ⚙️ SISTEMAS
// =========================
import ProblemSystem from "./systems/ProblemSystem.js";
import DiagnosisSystem from "./systems/DiagnosisSystem.js";
import TestSystem from "./systems/TestSystem.js";
import JobSystem from "./systems/JobSystem.js";
import InventorySystem from "./systems/InventorySystem.js";
import ShopSystem from "./systems/ShopSystem.js";
import ToolSystem from "./systems/ToolSystem.js";
import DependencySystem from "./systems/DependencySystem.js";

// =========================
// 📦 DADOS
// =========================
import PARTS from "./data/parts.js";

// =========================
// 🚗 ESTADO DO JOGO
// =========================
const car = {
  parts: [
    { id: "wheel", name: "Roda", condition: 1 },
    { id: "brake_pad", name: "Pastilha de Freio", condition: 0.2 },
    { id: "battery", name: "Bateria", condition: 0.3 },
    { id: "spark_plug", name: "Vela", condition: 0.3 },
  ],
  problems: [],
  removedParts: [], // 👈 desmontagem
};

let money = 500;
window.money = money;

// =========================
// 🔧 SISTEMAS INSTANCIADOS
// =========================
const problemSystem = new ProblemSystem();
const diagnosisSystem = new DiagnosisSystem();
const testSystem = new TestSystem();
const jobSystem = new JobSystem(problemSystem);
const inventory = new InventorySystem();
const shop = new ShopSystem(inventory);
const toolSystem = new ToolSystem();
const dependencySystem = new DependencySystem();

// =========================
// 🖥️ UI
// =========================
const ui = new UIManager("app");

ui.register("garage", new GarageScreen());
ui.register("client", new ClientScreen());
ui.register("inventory", new InventoryScreen());
ui.register("shop", new ShopScreen());

// =========================
// 🚀 INIT
// =========================
function init() {
  ui.show("client", {
    jobSystem,
    car,
    problemSystem,
    inventory,
    shop,
    toolSystem,
    dependencySystem,
  });
}

// =========================
// 🔄 NAVEGAÇÃO
// =========================
window.navigate = function (screen) {
  ui.show(screen, {
    car,
    problemSystem,
    jobSystem,
    inventory,
    shop,
    toolSystem,
    dependencySystem,
  });
};

// =========================
// 🧾 JOBS
// =========================
window.generateJob = function () {
  jobSystem.generateJob();
  ui.show("client", { jobSystem });
};

window.acceptJob = function () {
  jobSystem.acceptJob(car);

  ui.show("garage", {
    car,
    problemSystem,
    jobSystem,
    inventory,
    toolSystem,
    dependencySystem,
  });
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

// =========================
// 🔍 DIAGNÓSTICO
// =========================
window.inspectCar = function () {
  diagnosisSystem.inspect(car);

  ui.show("garage", {
    car,
    problemSystem,
    inventory,
    toolSystem,
    dependencySystem,
  });
};

window.scanCar = function () {
  diagnosisSystem.scan(car);

  ui.show("garage", {
    car,
    problemSystem,
    inventory,
    toolSystem,
    dependencySystem,
  });
};

// =========================
// 🧪 TESTES
// =========================
window.testEngine = function () {
  const results = testSystem.runEngineTest(car);
  alert(results.join("\n"));
};

window.testDrive = function () {
  const results = testSystem.runDriveTest(car);
  alert(results.join("\n"));
};

// =========================
// 🛒 LOJA
// =========================
window.buyPart = function (id) {
  const success = shop.buy(id);

  if (success) {
    window.money = window.money;
  }

  ui.show("shop", { shop });
};

// =========================
// 🎒 INVENTÁRIO + INSTALAÇÃO
// =========================
window.installPart = function (id) {
  const partData = PARTS.find((p) => p.id === id);

  // ferramenta
  if (!toolSystem.canUse(partData.tool)) {
    alert("Ferramenta incorreta!");
    return;
  }

  // inventário
  if (!inventory.has(id)) {
    alert("Você não tem a peça!");
    return;
  }

  // instalar
  const index = car.removedParts.indexOf(id);

  if (index !== -1) {
    car.removedParts.splice(index, 1);
  }

  const part = car.parts.find((p) => p.id === id);
  part.condition = 1;

  inventory.remove(id);

  problemSystem.update(car);

  ui.show("garage", {
    car,
    problemSystem,
    inventory,
    toolSystem,
    dependencySystem,
  });
};

// =========================
// 🔧 DESMONTAGEM
// =========================
window.removePart = function (id) {
  const partData = PARTS.find((p) => p.id === id);

  // ferramenta
  if (!toolSystem.canUse(partData.tool)) {
    alert("Ferramenta incorreta!");
    return;
  }

  // dependências
  const blocked = dependencySystem.getBlockingParts(id, car.removedParts);

  if (blocked.length > 0) {
    alert("Remova antes: " + blocked.join(", "));
    return;
  }

  if (!car.removedParts.includes(id)) {
    car.removedParts.push(id);
  }

  ui.show("garage", {
    car,
    problemSystem,
    inventory,
    toolSystem,
    dependencySystem,
  });
};

// =========================
// 🧰 FERRAMENTAS
// =========================
window.selectTool = function (toolId) {
  toolSystem.select(toolId);
  alert("Ferramenta selecionada: " + toolId);
};

window.selectedPart = null;

window.selectPart = function (id) {
  window.selectedPart = id;

  ui.show("garage", {
    car,
    problemSystem,
    inventory,
    toolSystem,
    dependencySystem,
    selectedPart: id,
  });
};

// =========================
// ▶️ START
// =========================
init();
