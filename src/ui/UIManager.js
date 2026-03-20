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

    if (!screen) return;

    this.currentScreen = name;

    this.root.innerHTML = `
    <div class="layout">

      <header class="header">
        <h1>🔧 Car Mechanic Simulator - GPT</h1>
        <div class="money">💰 $${window.money || 0}</div>
      </header>

      <nav class="menu">
        <button onclick="window.navigate('garage')">🚗 Garagem</button>
        <button onclick="window.navigate('client')">👤 Cliente</button>
        <button onclick="window.navigate('inventory')">📦 Inventário</button>
        <button onclick="window.navigate('shop')">🛒 Loja</button>
      </nav>

      <main class="content">
        ${screen.render(context)}
      </main>

      <footer class="tools">
        🔧 Ferramentas:
        <button>Chave inglesa</button>
        <button>Chave de roda</button>
      </footer>

    </div>
  `;
  }
}

export default UIManager;
