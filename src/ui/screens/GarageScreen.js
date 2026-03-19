class GarageScreen {
  render({ car, problemSystem }) {
    let html = `<h2>🚗 Garagem</h2>`;

    // PROBLEMAS (diagnóstico)
    const discovered = problemSystem.getDiscovered(car);

    html += `<h3>🔍 Diagnóstico</h3>`;

    if (discovered.length === 0) {
      html += `<p>Nenhum problema identificado</p>`;
    } else {
      discovered.forEach((p) => {
        html += `
          <div>
            ${p.name} - ${p.resolved ? "✅" : "❌"}
          </div>
        `;
      });
    }

    // BOTÕES
    html += `
      <button onclick="window.inspectCar()">🔍 Inspecionar</button>
      <button onclick="window.scanCar()">💻 Scanner</button>
      <button onclick="window.testEngine()">🔧 Testar motor</button>
      <button onclick="window.testDrive()">🚗 Test drive</button>
    `;

    // PEÇAS
    html += `<h3>🔩 Peças</h3>`;

    car.parts.forEach((part) => {
      html += `
        <div>
          ${part.name} - ${Math.round(part.condition * 100)}%
          <button onclick="window.repairPart('${part.id}')">Reparar</button>
        </div>
      `;
    });

    return html;
  }
}

export default GarageScreen;
