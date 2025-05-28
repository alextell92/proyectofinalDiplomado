import "./visitantes.css";
import { renderHome } from "./index.js"; // Asegúrate de importar la vista de inicio

export function renderVisitantes() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("visitantes-container");

  const title = document.createElement("h2");
  title.classList.add("visitantes-title");
  title.innerHTML = "&lt;&lt;view&gt;&gt; VisitantesView";

  const tableWrapper = document.createElement("div");
  tableWrapper.classList.add("table-wrapper");

  const table = document.createElement("table");
  table.classList.add("visitantes-table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["ID", "Nombre", "Fecha Entrada", "Fecha Salida", "Habitación", "Status"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  const tbody = document.createElement("tbody");
  const row = document.createElement("tr");
  ["001", "Juan Pérez", "2025-05-20", "2025-05-22", "101", "Activo"].forEach(text => {
    const td = document.createElement("td");
    td.textContent = text;
    row.appendChild(td);
  });
  tbody.appendChild(row);

  table.appendChild(thead);
  table.appendChild(tbody);
  tableWrapper.appendChild(table);

  // Botón para regresar
  const backButton = document.createElement("button");
  backButton.textContent = "← Regresar al inicio";
  backButton.style.marginTop = "2rem";
  backButton.style.padding = "0.5rem 1rem";
  backButton.style.cursor = "pointer";
  backButton.addEventListener("click", () => {
    renderHome();
  });

  container.appendChild(title);
  container.appendChild(tableWrapper);
  container.appendChild(backButton);
  root.appendChild(container);
}
