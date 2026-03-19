class GarageUI {
  constructor(rootId = "app") {
    this.root = document.getElementById(rootId);
  }

  render(car, problemSystem) {
    if (!this.root) return;

    let html = `
      <h1>🔧 Oficina Mecânica</h1>
    `;

    // =========================
    // 🚗 STATUS DO CARRO
    // =========================
    html += `
      <section>
        <h2>🚗 Carro</h2>
        <p>Total de peças: ${car.parts.length}</p>
      </section>
    `;

    // =========================
    // ⚠️ PROBLEMAS (COM DIAGNÓSTICO)
    // =========================
    html += `<section><h2>⚠️ Diagnóstico</h2>`;

    const discovered = problemSystem.getDiscovered(car);

    if (discovered.length === 0) {
      html += `<p>Nenhum problema identificado ainda...</p>`;
    } else {
      discovered.forEach((problem) => {
        html += `
      <div style="border:1px solid #ccc; margin:5px; padding:5px;">
        <strong>${problem.name}</strong><br/>
        Peça: ${problem.partId}<br/>
        Status: ${problem.resolved ? "✅ Resolvido" : "❌ Pendente"}
      </div>
    `;
      });
    }

    html += `
  <button onclick="window.inspectCar()">🔍 Inspecionar</button>
  <button onclick="window.scanCar()">💻 Scanner</button>
`;

    html += `</section>`;

    // =========================
    // 🔩 LISTA DE PEÇAS
    // =========================
    html += `<section><h2>🔩 Peças</h2>`;

    car.parts.forEach((part) => {
      html += `
        <div style="border:1px solid #999; margin:5px; padding:5px;">
          <h3>${part.name || part.id}</h3>
          <p>Condição: ${Math.round(part.condition * 100)}%</p>

          <button onclick="window.removePart('${part.id}')">
            Remover
          </button>

          <button onclick="window.repairPart('${part.id}')">
            Reparar
          </button>
        </div>
      `;
    });

    html += `</section>`;

    // =========================
    // 🧪 TESTES
    // =========================
    html += `<section><h2>🧪 Testes</h2>

    <button onclick="window.testEngine()">🔧 Testar motor</button>
    <button onclick="window.testDrive()">🚗 Test drive</button>
    </section>`;

    // =========================
    // 🏁 STATUS FINAL
    // =========================
    html += `<section><h2>🏁 Status</h2>`;

    if (problemSystem && problemSystem.isFixed(car)) {
      const reward = problemSystem.getReward(car);

      html += `
        <p style="color:green;"><strong>Carro consertado!</strong></p>
        <p>Pagamento: $${reward}</p>
      `;
    } else {
      html += `<p>Carro ainda com problemas...</p>`;
    }

    html += `</section>`;

    // render final
    this.root.innerHTML = html;
  }
}

export default GarageUI;
