export class Car {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;

    this.slots = {
      engine: null,
      battery: null,
      radiator: null,
      wheelFL: null,
      wheelFR: null,
      wheelRL: null,
      wheelRR: null,
    };
  }

  installPart(slot, part) {
    this.slots[slot] = part;
  }

  removePart(slot) {
    const part = this.slots[slot];

    this.slots[slot] = null;

    return part;
  }
}
