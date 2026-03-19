class ClientScreen {
  render({ jobSystem }) {
    const job = jobSystem.currentJob;

    if (!job) {
      return `
        <h2>👤 Cliente</h2>
        <button onclick="generateJob()">Gerar cliente</button>
      `;
    }

    return `
      <h2>👤 Cliente</h2>

      <div class="card">
        <strong>${job.client}</strong><br/>
        Problema: ${job.description}<br/>
        Pagamento: $${job.reward}
      </div>

      ${
        job.accepted
          ? `<p>🔧 Serviço em andamento...</p>`
          : `<button onclick="acceptJob()">Aceitar trabalho</button>`
      }

      ${
        job.accepted
          ? `<button onclick="completeJob()">Finalizar serviço</button>`
          : ""
      }
    `;
  }
}

export default ClientScreen;
