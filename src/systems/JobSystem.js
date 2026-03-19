import JOBS from "../data/jobs.js";

class JobSystem {
  constructor(problemSystem) {
    this.jobs = JOBS;
    this.currentJob = null;
    this.problemSystem = problemSystem;
  }

  generateJob() {
    const job = this.jobs[Math.floor(Math.random() * this.jobs.length)];

    this.currentJob = {
      ...job,
      accepted: false,
      completed: false,
    };

    return this.currentJob;
  }

  acceptJob(car) {
    if (!this.currentJob) return;

    this.currentJob.accepted = true;

    // aplica problemas no carro
    car.problems = [];

    this.problemSystem.database
      .filter((p) => this.currentJob.problems.includes(p.id))
      .forEach((problem) => {
        car.problems.push({
          ...problem,
          resolved: false,
          discovered: false,
        });
      });

    this.problemSystem.update(car);
  }

  completeJob(car) {
    if (!this.currentJob) return false;

    const allFixed = this.problemSystem.isFixed(car);

    if (allFixed) {
      this.currentJob.completed = true;
      return true;
    }

    return false;
  }
}

export default JobSystem;
