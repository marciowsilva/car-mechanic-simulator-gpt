import PARTS from "../data/parts.js";

class ShopSystem {
  constructor(inventory) {
    this.parts = PARTS;
    this.inventory = inventory;
  }

  buy(partId) {
    const part = this.parts.find((p) => p.id === partId);

    if (!part) return false;

    if (window.money < part.price) {
      alert("Dinheiro insuficiente!");
      return false;
    }

    window.money -= part.price;
    this.inventory.add(partId);

    return true;
  }
}

export default ShopSystem;
