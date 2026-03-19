import { GameState } from "../core/GameState.js";
import { Notifications } from "../ui/Notifications.js";

export const JobSystem = {
  currentJob: null,

  createJob() {
    const jobs = [
      { problem: "engine", reward: 900, description: "Trocar motor" },
      { problem: "battery", reward: 300, description: "Trocar bateria" },
      { problem: "wheel", reward: 200, description: "Trocar roda" },
    ];

    this.currentJob = jobs[Math.floor(Math.random() * jobs.length)];

    Notifications.show("Novo cliente!");
  },

  checkCompletion(car) {
    if (!this.currentJob) return;

    const type = this.currentJob.problem;

    let fixed = false;

    for (const slot in car.slots) {
      const part = car.slots[slot];

      if (part && part.type === type && part.condition > 0) {
        fixed = true;
      }

      if (part && part.type === type && part.condition <= 0) {
        fixed = false;
        break;
      }
    }

    if (fixed) {
      GameState.money += this.currentJob.reward;

      Notifications.show("Serviço concluído!");

      this.createJob();
    }
  },
};
