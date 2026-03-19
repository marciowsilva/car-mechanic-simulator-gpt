import { GameState } from "../core/GameState.js";
import { Notifications } from "../ui/Notifications.js";

export const JobSystem = {
  currentJob: null,

  createJob() {
    const jobs = [
      {
        problem: "battery",
        reward: 300,
        description: "Trocar bateria",
      },

      {
        problem: "engine",
        reward: 900,
        description: "Trocar motor",
      },

      {
        problem: "wheel",
        reward: 200,
        description: "Trocar roda",
      },
    ];

    const job = jobs[Math.floor(Math.random() * jobs.length)];

    this.currentJob = job;

    Notifications.show("Cliente chegou: " + job.description);
  },

  checkCompletion(car) {
    if (!this.currentJob) return;

    const type = this.currentJob.problem;

    for (const slot in car.slots) {
      const part = car.slots[slot];

      if (part && part.type === type) {
        GameState.money += this.currentJob.reward;

        Notifications.show("Serviço concluído! +$" + this.currentJob.reward);

        this.currentJob = null;

        this.createJob();

        return;
      }
    }
  },
};
