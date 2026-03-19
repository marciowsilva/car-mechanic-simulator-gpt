export const Loader = {
  async loadJSON(path) {
    const res = await fetch(path);

    return res.json();
  },
};
