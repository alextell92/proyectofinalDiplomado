import { renderHome } from "./index.js";
import { renderVisitantes } from "./visitantes.js";
import { renderComentarios } from "./comentarios.js";
import "./intranet.css";
export function renderIntranet() {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = "";

  const header = document.createElement("header");

  const h1 = document.createElement("h1");
  h1.textContent = "Intranet";

  // Panel de navegaci
  const navPanel = document.createElement("div");
  navPanel.classList.add("nav-panel");

  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  const menuItems = [
    { text: "Visitantes", action: () => renderVisitantes() },
    { text: "Comentarios", action: () => renderComentarios() },
  ];

  menuItems.forEach(({ text, action }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = text;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      action();
    });
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);

  header.appendChild(nav);

  header.appendChild(h1);

  // de contenido
  const contentArea = document.createElement("div");
  contentArea.id = "contentArea";
  contentArea.classList.add("content-area");
  contentArea.textContent = "Panel";

  // Cerrar sesion
  const logoutBtn = document.createElement("button");
  logoutBtn.classList.add("logout-button");
  logoutBtn.textContent = "Cerrar sesión";
  logoutBtn.addEventListener("click", () => {
    renderHome();
  });

  header.appendChild(logoutBtn);
  // root.appendChild(title);
  // root.appendChild(navPanel);

  root.appendChild(header);
  // root.appendChild(contentArea);
  // root.appendChild(logoutBtn);
}
