export const Notifications = {
  show(message) {
    const container = document.getElementById("notifications");

    const div = document.createElement("div");

    div.className = "notification";
    div.innerText = message;

    container.appendChild(div);

    setTimeout(() => div.remove(), 2000);
  },
};
