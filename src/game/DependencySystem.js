import { DependencyRules } from "./DependencyRules.js";

export const DependencySystem = {
  canRemove(car, slot) {
    const dependencies = DependencyRules[slot] || [];

    for (const dep of dependencies) {
      if (car.slots[dep]) {
        return {
          allowed: false,
          blocking: dep,
        };
      }
    }

    return { allowed: true };
  },
};
