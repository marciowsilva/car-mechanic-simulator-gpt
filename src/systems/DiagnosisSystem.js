class DiagnosisSystem {
  inspect(car) {
    console.log("🔍 Inspeção visual...");

    car.problems.forEach((problem) => {
      if (problem.methods.includes("inspection")) {
        problem.discovered = true;
      }
    });
  }

  scan(car) {
    console.log("💻 Scanner OBD...");

    car.problems.forEach((problem) => {
      if (problem.methods.includes("scanner")) {
        problem.discovered = true;
      }
    });
  }

  getUndiscovered(car) {
    return car.problems.filter((p) => !p.discovered);
  }
}

export default DiagnosisSystem;
