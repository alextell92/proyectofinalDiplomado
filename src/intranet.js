import { renderHome } from "./index.js";           // para cerrar sesión y volver al home
import { renderVisitantes } from "./visitantes.js"; // si luego quieres render completo
import { renderComentarios } from "./comentarios.js";
import "./intranet.css";
export function renderIntranet() {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = "";

  // Inyectar estilos
  const style = document.createElement("style");
  style.textContent = `

  `;
  document.head.appendChild(style);

  // Título de la vista
  const title = document.createElement("div");
  title.classList.add("view-title");
  title.textContent = "<<view>> intranetView";

  // Panel de navegación
  const navPanel = document.createElement("div");
  navPanel.classList.add("nav-panel");

  const btnVisitantes = document.createElement("button");
  btnVisitantes.textContent = "Visitantes";
  btnVisitantes.addEventListener("click", () => {
    contentArea.textContent = "Panel de Visitantes";
    // o bien: renderVisitantes();
  });

  const btnComentarios = document.createElement("button");
  btnComentarios.textContent = "Comentarios";
  btnComentarios.addEventListener("click", () => {
    contentArea.textContent = "Panel de Comentarios";
    // o bien: renderComentarios();
  });

  navPanel.appendChild(btnVisitantes);
  navPanel.appendChild(btnComentarios);

  // Área de contenido
  const contentArea = document.createElement("div");
  contentArea.id = "contentArea";
  contentArea.classList.add("content-area");
  contentArea.textContent = "contentArea: <<widget>> Panel";

  // Botón de cerrar sesión
  const logoutBtn = document.createElement("button");
  logoutBtn.classList.add("logout-button");
  logoutBtn.textContent = "Cerrar sesión";
  logoutBtn.addEventListener("click", () => {
    renderHome();
  });

  // Ensamblar todo en el root
  root.appendChild(title);
  root.appendChild(navPanel);
  root.appendChild(contentArea);
  root.appendChild(logoutBtn);
}
