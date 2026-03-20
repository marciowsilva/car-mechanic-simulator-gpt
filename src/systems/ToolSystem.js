class ToolSystem {
  constructor() {
    this.currentTool = null;
  }

  select(toolId) {
    this.currentTool = toolId;
  }

  canUse(requiredTool) {
    return this.currentTool === requiredTool;
  }
}

export default ToolSystem;
