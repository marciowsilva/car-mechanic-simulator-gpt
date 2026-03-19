class GarageScreen {
  render({ car, problemSystem }) {
    let html = `<h2>🚗 Garagem</h2>`;

    const discovered = problemSystem.getDiscovered(car);

    html += `<h3>🔍 Diagnóstico</h3>`;

    if (discovered.length === 0) {
      html += `<p>Nenhum problema identificado</p>`;
    } else {
      discovered.forEach((p) => {
        html += `
        <div class="card">
          ${p.name} - ${p.resolved ? "✅" : "❌"}
        </div>
      `;
      });
    }

    html += `
    <div class="actions">
      <button onclick="inspectCar()">🔍 Inspecionar</button>
      <button onclick="scanCar()">💻 Scanner</button>
      <button onclick="testEngine()">🔧 Motor</button>
      <button onclick="testDrive()">🚗 Drive</button>
    </div>
  `;

    html += `<h3>🔩 Peças</h3>`;

    car.parts.forEach((part) => {
      html += `
      <div class="card">
        ${part.name} - ${Math.round(part.condition * 100)}%
        <button onclick="installPart('${part.id}')">Instalar peça</button>
      </div>
    `;
    });

    return html;
  }
}

export default GarageScreen;
