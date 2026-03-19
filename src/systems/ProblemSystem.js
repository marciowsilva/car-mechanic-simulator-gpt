import PROBLEMS from "../data/problems.js";

class ProblemSystem {
  constructor() {
    this.database = PROBLEMS;
  }

  generate(car, amount = 2) {
    const shuffled = [...this.database].sort(() => Math.random() - 0.5);

    car.problems = shuffled.slice(0, amount).map((problem) => ({
      ...problem,
      resolved: false,
      discovered: false, // 👈 NOVO
    }));
  }

  update(car) {
    for (const problem of car.problems) {
      const part = car.parts.find((p) => p.id === problem.partId);

      if (!part) continue;

      problem.resolved = part.condition >= problem.minCondition;
    }
  }

  getDiscovered(car) {
    return car.problems.filter((p) => p.discovered);
  }

  isFixed(car) {
    return car.problems.every((p) => p.resolved);
  }

  getReward(car) {
    return car.problems.reduce((total, p) => {
      return p.resolved ? total + p.reward : total;
    }, 0);
  }
}

export default ProblemSystem;
