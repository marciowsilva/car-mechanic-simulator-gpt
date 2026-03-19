import PARTS from "../../data/parts.js";

class ShopScreen {
  render({ shop }) {
    let html = `<h2>🛒 Loja</h2>`;

    PARTS.forEach((part) => {
      html += `
        <div class="card">
          ${part.name} - $${part.price}
          <button onclick="buyPart('${part.id}')">Comprar</button>
        </div>
      `;
    });

    return html;
  }
}

export default ShopScreen;
