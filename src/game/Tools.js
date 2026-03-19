import { Notifications } from "../ui/Notifications.js";

export const Tools = {
  owned: ["wrench"], // começa com chave inglesa

  selected: "wrench",

  select(tool) {
    this.selected = tool;

    Notifications.show("Ferramenta: " + tool);
  },

  has(tool) {
    return this.owned.includes(tool);
  },
};
