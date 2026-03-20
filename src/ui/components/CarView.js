import PARTS from "../../data/parts.js";

class CarView {
  getStatus(partId, car, toolSystem, dependencySystem) {
    const data = PARTS.find((p) => p.id === partId);

    const blocked = dependencySystem.getBlockingParts(partId, car.removedParts);

    if (blocked.length > 0) return "blocked";

    if (!toolSystem.canUse(data.tool)) return "wrong-tool";

    return "ok";
  }

  render(car, toolSystem, dependencySystem) {
    const getClass = (partId) => {
      const status = this.getStatus(partId, car, toolSystem, dependencySystem);

      if (status === "ok") return "part ok";
      if (status === "blocked") return "part blocked";
      if (status === "wrong-tool") return "part wrong";

      return "part";
    };

    return `
      <div class="car">

        <div class="car-body">🚗</div>

        <div class="${getClass("wheel")}" onclick="selectPart('wheel')">
          🛞
        </div>

        <div class="${getClass("brake_pad")}" onclick="selectPart('brake_pad')">
          🟥
        </div>

        <div class="${getClass("spark_plug")}" onclick="selectPart('spark_plug')">
          ⚙️
        </div>

        <div class="${getClass("battery")}" onclick="selectPart('battery')">
          🔋
        </div>

      </div>
    `;
  }
}

export default CarView;
