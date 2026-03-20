import PARTS from "../../data/parts.js";
import CarView from "../components/CarView.js";

class GarageScreen {
  constructor() {
    this.carView = new CarView();
  }

  render({
    car,
    problemSystem,
    inventory,
    toolSystem,
    dependencySystem,
    selectedPart,
  }) {
    let html = `<h2>🚗 Garagem</h2>`;

    // =========================
    // 🚗 VISUAL DO CARRO
    // =========================
    html += this.carView.render(car, toolSystem, dependencySystem);

    // =========================
    // 🎯 PEÇA SELECIONADA
    // =========================
    if (selectedPart) {
      html += `<h3>🔎 Selecionado: ${selectedPart}</h3>`;
    }

    // =========================
    // 🔍 DIAGNÓSTICO
    // =========================
    html += `<h3>🔍 Diagnóstico</h3>`;

    const discovered = problemSystem.getDiscovered(car);

    if (discovered.length === 0) {
      html += `<p>Nenhum problema identificado</p>`;
    } else {
      discovered.forEach((p) => {
        html += `
          <div class="card">
            ${p.name} - ${p.resolved ? "✅ Resolvido" : "❌ Pendente"}
          </div>
        `;
      });
    }

    // =========================
    // 🧪 TESTES
    // =========================
    html += `
      <div class="actions">
        <button onclick="inspectCar()">🔍 Inspecionar</button>
        <button onclick="scanCar()">💻 Scanner</button>
        <button onclick="testEngine()">🔧 Motor</button>
        <button onclick="testDrive()">🚗 Drive</button>
      </div>
    `;

    // =========================
    // 🔩 PEÇAS
    // =========================
    html += `<h3>🔩 Peças</h3>`;

    car.parts.forEach((part) => {
      const data = PARTS.find((p) => p.id === part.id);
      const removed = car.removedParts.includes(part.id);

      const blocked = dependencySystem.getBlockingParts(
        part.id,
        car.removedParts,
      );

      const hasTool = toolSystem.canUse(data.tool);

      html += `
        <div class="card">
          <strong>${part.name}</strong><br/>
          Condição: ${Math.round(part.condition * 100)}%<br/>
          Estado: ${removed ? "❌ Removido" : "✅ Instalado"}<br/>
          Ferramenta: ${data.tool}<br/>
          ${hasTool ? "🟢 Ferramenta correta" : "🔴 Ferramenta incorreta"}<br/>
      `;

      // BLOQUEIOS
      if (blocked.length > 0) {
        html += `<p>🔒 Bloqueado por: ${blocked.join(", ")}</p>`;
      }

      // BOTÕES
      if (!removed) {
        html += `
          <button onclick="removePart('${part.id}')">
            Remover
          </button>
        `;
      } else {
        html += `
          <button onclick="installPart('${part.id}')">
            Instalar
          </button>
        `;
      }

      html += `</div>`;
    });

    // =========================
    // 🎒 INVENTÁRIO RESUMO
    // =========================
    html += `<h3>🎒 Inventário</h3>`;

    const items = Object.keys(inventory.items);

    if (items.length === 0) {
      html += `<p>Vazio</p>`;
    } else {
      items.forEach((id) => {
        const part = PARTS.find((p) => p.id === id);

        html += `
          <div class="card">
            ${part.name} (x${inventory.items[id]})
          </div>
        `;
      });
    }

    return html;
  }
}

export default GarageScreen;
