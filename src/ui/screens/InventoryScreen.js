import PARTS from "../../data/parts.js";

class InventoryScreen {
  render({ inventory }) {
    let html = `<h2>📦 Inventário</h2>`;

    const items = Object.keys(inventory.items);

    if (items.length === 0) {
      html += `<p>Inventário vazio</p>`;
      return html;
    }

    items.forEach((id) => {
      const part = PARTS.find((p) => p.id === id);

      html += `
        <div class="card">
          ${part.name} (x${inventory.items[id]})
        </div>
      `;
    });

    return html;
  }
}

export default InventoryScreen;
