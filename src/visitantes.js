import axios from "axios";
import "./visitantes.css";
import { renderHeader } from "./header.js";

const API_BASE = "https://jsonplaceholder.typicode.com";
const LIMIT = 50;

export async function renderVisitantes() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("visitantes-container");

  // const header = document.createElement("header");

  renderHeader({
    title: "Visitantes Registrados",
    backButton: {
      label: "← Volver a intranet",
      action: () => {
        import("./intranet.js")
          .then((module) => module.renderIntranet())
          .catch((err) => console.error("Error cargando home:", err));
      },
    },
  });

  // Tabla
  const tableWrapper = document.createElement("div");
  tableWrapper.classList.add("table-wrapper");

  const table = document.createElement("table");
  table.classList.add("visitantes-table");

  // Encabezado
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["ID", "Nombre", "Usuario", "Email", "Ciudad"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // cargando
  const tbody = document.createElement("tbody");
  const loadingRow = document.createElement("tr");
  const loadingTd = document.createElement("td");
  loadingTd.setAttribute("colspan", "5");
  loadingTd.textContent = "Cargando visitantes...";
  loadingTd.classList.add("loading");
  loadingRow.appendChild(loadingTd);
  tbody.appendChild(loadingRow);
  table.appendChild(tbody);
  tableWrapper.appendChild(table);

  container.append(tableWrapper);
  // root.appendChild(header);
  root.appendChild(container);

  // API personas
  try {
    const { data } = await axios.get(`${API_BASE}/users`);
    const users = data.slice(0, LIMIT);

    tbody.innerHTML = "";

    users.forEach((user) => {
      const row = document.createElement("tr");
      const { id, name, username, email, address } = user;
      [id, name, username, email, address.city].forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al cargar visitantes:", error);
    tbody.innerHTML = "";
    const errRow = document.createElement("tr");
    const errTd = document.createElement("td");
    errTd.setAttribute("colspan", "5");
    errTd.textContent = "No se pudieron cargar los visitantes.";
    errTd.classList.add("error");
    errRow.appendChild(errTd);
    tbody.appendChild(errRow);
  }
}
