class UIManager {
  constructor(rootId = "app") {
    this.root = document.getElementById(rootId);
    this.screens = {};
    this.currentScreen = null;
  }

  register(name, screen) {
    this.screens[name] = screen;
  }

  show(name, context = {}) {
    const screen = this.screens[name];

    if (!screen) {
      console.error("Tela não encontrada:", name);
      return;
    }

    this.currentScreen = name;

    this.root.innerHTML = `
      <div class="topbar">
        <button onclick="window.navigate('garage')">🚗 Garagem</button>
        <button onclick="window.navigate('client')">👤 Cliente</button>
        <button onclick="window.navigate('inventory')">📦 Inventário</button>
        <button onclick="window.navigate('shop')">🛒 Loja</button>
      </div>

      <div class="content">
        ${screen.render(context)}
      </div>
    `;
  }
}

export default UIManager;
