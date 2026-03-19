export class ProblemSystem {
  constructor() {
    this.problemsDatabase = this.createProblemsDatabase();
  }

  createProblemsDatabase() {
    return [
      {
        id: "dead_battery",
        name: "Bateria descarregada",
        affectedPart: "battery",

        check: (car) => {
          const part = car.getPart("battery");
          return part && part.condition < 0.3;
        },

        fix: (car) => {
          const part = car.getPart("battery");
          if (part) part.condition = 1;
        },
      },

      {
        id: "worn_spark_plug",
        name: "Vela desgastada",
        affectedPart: "spark_plug",

        check: (car) => {
          const part = car.getPart("spark_plug");
          return part && part.condition < 0.4;
        },

        fix: (car) => {
          const part = car.getPart("spark_plug");
          if (part) part.condition = 1;
        },
      },

      {
        id: "dirty_air_filter",
        name: "Filtro de ar sujo",
        affectedPart: "air_filter",

        check: (car) => {
          const part = car.getPart("air_filter");
          return part && part.condition < 0.5;
        },

        fix: (car) => {
          const part = car.getPart("air_filter");
          if (part) part.condition = 1;
        },
      },
    ];
  }

  generateProblems(car, amount = 2) {
    const shuffled = [...this.problemsDatabase].sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0, amount);

    car.problems = selected.map((problem) => ({
      ...problem,
      isResolved: false,
    }));
  }

  checkProblems(car) {
    car.problems.forEach((problem) => {
      if (problem.check(car)) {
        problem.isResolved = false;
      } else {
        problem.isResolved = true;
      }
    });
  }

  isCarFixed(car) {
    return car.problems.every((p) => p.isResolved);
  }

  getActiveProblems(car) {
    return car.problems.filter((p) => !p.isResolved);
  }
}
