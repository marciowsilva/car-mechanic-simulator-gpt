export class Part {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.price = data.price;

    // 🔥 novo
    this.condition = data.condition ?? 100;
  }
}
