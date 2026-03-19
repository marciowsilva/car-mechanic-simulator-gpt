class InventorySystem {
  constructor() {
    this.items = {};
  }

  add(partId) {
    this.items[partId] = (this.items[partId] || 0) + 1;
  }

  remove(partId) {
    if (!this.items[partId]) return false;

    this.items[partId]--;

    if (this.items[partId] <= 0) {
      delete this.items[partId];
    }

    return true;
  }

  has(partId) {
    return this.items[partId] > 0;
  }
}

export default InventorySystem;
