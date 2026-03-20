import PARTS from "../data/parts.js";

class DependencySystem {
  canAccess(partId, removedParts) {
    const part = PARTS.find((p) => p.id === partId);

    if (!part || !part.dependencies) return true;

    return part.dependencies.every((dep) => removedParts.includes(dep));
  }

  getBlockingParts(partId, removedParts) {
    const part = PARTS.find((p) => p.id === partId);

    if (!part || !part.dependencies) return [];

    return part.dependencies.filter((dep) => !removedParts.includes(dep));
  }
}

export default DependencySystem;
