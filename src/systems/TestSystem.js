class TestSystem {
  runEngineTest(car) {
    const symptoms = [];

    car.problems.forEach((problem) => {
      if (!problem.resolved) {
        if (problem.symptoms.includes("no_start")) {
          symptoms.push("❌ O carro não liga");
        }

        if (problem.symptoms.includes("engine_misfire")) {
          symptoms.push("⚠️ Motor falhando");
        }
      }
    });

    if (symptoms.length === 0) {
      symptoms.push("✅ Motor funcionando perfeitamente");
    }

    return symptoms;
  }

  runDriveTest(car) {
    const symptoms = [];

    car.problems.forEach((problem) => {
      if (!problem.resolved) {
        if (problem.symptoms.includes("low_power")) {
          symptoms.push("🐢 Carro sem força");
        }

        if (problem.symptoms.includes("brake_noise")) {
          symptoms.push("🔊 Barulho ao frear");
        }
      }
    });

    if (symptoms.length === 0) {
      symptoms.push("🚗 Dirigindo normalmente");
    }

    return symptoms;
  }
}

export default TestSystem;
