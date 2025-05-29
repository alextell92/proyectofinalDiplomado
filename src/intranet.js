import { renderHome } from "./index.js";          
import { renderVisitantes } from "./visitantes.js"; 
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

 
  const title = document.createElement("div");
  title.classList.add("view-title");
  title.textContent = "<<view>> intranetView";

  // Panel de navegaci
  const navPanel = document.createElement("div");
  navPanel.classList.add("nav-panel");

  const btnVisitantes = document.createElement("button");
  btnVisitantes.textContent = "Visitantes";
  btnVisitantes.addEventListener("click", () => {
    contentArea.textContent = "Panel de Visitantes";
  
  });

  const btnComentarios = document.createElement("button");
  btnComentarios.textContent = "Comentarios";
  btnComentarios.addEventListener("click", () => {
    contentArea.textContent = "Panel de Comentarios";
   
  });

  navPanel.appendChild(btnVisitantes);
  navPanel.appendChild(btnComentarios);

  // de contenido
  const contentArea = document.createElement("div");
  contentArea.id = "contentArea";
  contentArea.classList.add("content-area");
  contentArea.textContent = "contentArea: <<widget>> Panel";

  // Cerrar sesion
  const logoutBtn = document.createElement("button");
  logoutBtn.classList.add("logout-button");
  logoutBtn.textContent = "Cerrar sesión";
  logoutBtn.addEventListener("click", () => {
    renderHome();
  });

  root.appendChild(title);
  root.appendChild(navPanel);
  root.appendChild(contentArea);
  root.appendChild(logoutBtn);
}
