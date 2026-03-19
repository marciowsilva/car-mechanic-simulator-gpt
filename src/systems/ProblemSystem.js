import PROBLEMS from "../data/problems.js";

class ProblemSystem {
  constructor() {
    this.database = PROBLEMS;
  }

  generate(car, amount = 2) {
    if (!car) return;

    const shuffled = [...this.database].sort(() => Math.random() - 0.5);

    const selected = shuffled.slice(0, amount);

    car.problems = selected.map((problem) => ({
      id: problem.id,
      name: problem.name,
      partId: problem.partId,
      minCondition: problem.minCondition,
      reward: problem.reward,
      resolved: false,
    }));
  }

  update(car) {
    if (!car || !car.parts || !car.problems) return;

    for (let i = 0; i < car.problems.length; i++) {
      const problem = car.problems[i];

      const part = car.parts.find((p) => p.id === problem.partId);

      if (!part) continue;

      if (part.condition >= problem.minCondition) {
        problem.resolved = true;
      } else {
        problem.resolved = false;
      }
    }
  }

  isFixed(car) {
    if (!car || !car.problems || car.problems.length === 0) {
      return false;
    }

    return car.problems.every((p) => p.resolved === true);
  }

  getActive(car) {
    if (!car || !car.problems) return [];

    return car.problems.filter((p) => !p.resolved);
  }

  getReward(car) {
    if (!car || !car.problems) return 0;

    let total = 0;

    for (let i = 0; i < car.problems.length; i++) {
      const problem = car.problems[i];

      if (problem.resolved) {
        total += problem.reward;
      }
    }

    return total;
  }

  debug(car) {
    console.log("========== PROBLEMAS DO CARRO ==========");

    if (!car || !car.problems || car.problems.length === 0) {
      console.log("Nenhum problema encontrado.");
      return;
    }

    for (let i = 0; i < car.problems.length; i++) {
      const p = car.problems[i];

      console.log(`[${p.resolved ? "OK" : "X"}] ${p.name} | peça: ${p.partId}`);
    }

    console.log("========================================");
  }
}

export default ProblemSystem;
