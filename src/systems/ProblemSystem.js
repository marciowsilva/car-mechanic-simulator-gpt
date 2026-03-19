import { problemsDatabase } from "../data/problems.js";

export class ProblemSystem {
  constructor() {
    this.database = problemsDatabase;
  }

  generateProblems(car, amount = 2) {
    const shuffled = [...this.database].sort(() => Math.random() - 0.5);

    const selected = shuffled.slice(0, amount);

    car.problems = selected.map((problem) => ({
      id: problem.id,
      name: problem.name,
      affectedPart: problem.affectedPart,
      minCondition: problem.minCondition,
      reward: problem.reward,
      resolved: false,
    }));
  }

  updateProblems(car) {
    if (!car.problems) return;

    for (const problem of car.problems) {
      const part = this.getPart(car, problem.affectedPart);

      if (!part) continue;

      if (part.condition >= problem.minCondition) {
        problem.resolved = true;
      } else {
        problem.resolved = false;
      }
    }
  }

  getPart(car, partId) {
    if (!car.parts) return null;
    return car.parts.find((p) => p.id === partId);
  }

  getActiveProblems(car) {
    if (!car.problems) return [];
    return car.problems.filter((p) => !p.resolved);
  }

  isCarFixed(car) {
    if (!car.problems || car.problems.length === 0) return false;
    return car.problems.every((p) => p.resolved);
  }

  getTotalReward(car) {
    if (!car.problems) return 0;

    return car.problems.reduce((total, p) => {
      if (p.resolved) {
        return total + p.reward;
      }
      return total;
    }, 0);
  }

  debugProblems(car) {
    console.log("=== PROBLEMAS DO CARRO ===");

    if (!car.problems) {
      console.log("Nenhum problema gerado.");
      return;
    }

    for (const problem of car.problems) {
      console.log(
        `${problem.name} | Peça: ${problem.affectedPart} | Resolvido: ${problem.resolved}`,
      );
    }
  }
}
