export class Car {
  constructor(name) {
    this.name = name;

    this.slots = {
      engine: null,
      battery: null,
      radiator: null,
      wheelFL: null,
      wheelFR: null,
      wheelRL: null,
      wheelRR: null,
    };

    this.problems = [];
  }

  install(slot, part) {
    this.slots[slot] = part;
  }

  remove(slot) {
    const part = this.slots[slot];
    this.slots[slot] = null;
    return part;
  }

  getPart(partId) {
    return this.parts.find((p) => p.id === partId);
  }
}
