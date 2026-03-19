import { JobSystem } from "../systems/JobSystem.js";

export const JobUI = {
  render() {
    const el = document.getElementById("job-description");

    if (!JobSystem.currentJob) {
      el.innerText = "Nenhum cliente";

      return;
    }

    el.innerText = JobSystem.currentJob.description;
  },
};
