import axios from 'axios';
import "./visitantes.css";
import { renderHome } from "./index.js"; 

const API_BASE = 'https://jsonplaceholder.typicode.com';
const LIMIT = 20; 

export async function renderVisitantes() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("visitantes-container");

  // encabezado titulo
  const title = document.createElement("h2");
  title.classList.add("visitantes-title");
  title.textContent = "Visitantes Registrados";

  // Tabla
  const tableWrapper = document.createElement("div");
  tableWrapper.classList.add("table-wrapper");

  const table = document.createElement("table");
  table.classList.add("visitantes-table");

  // Encabezado
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["ID", "Nombre", "Usuario", "Email", "Ciudad"].forEach(text => {
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
  loadingTd.setAttribute('colspan', '5');
  loadingTd.textContent = "Cargando visitantes...";
  loadingTd.classList.add('loading');
  loadingRow.appendChild(loadingTd);
  tbody.appendChild(loadingRow);
  table.appendChild(tbody);
  tableWrapper.appendChild(table);

  // btn para regresar
  const backButton = document.createElement("button");
  backButton.textContent = "← Regresar al inicio";
  backButton.classList.add("back-button");
  backButton.addEventListener("click", () => {
    renderHome();
  });

  container.append(title, tableWrapper, backButton);
  root.appendChild(container);

  // API personas
  try {
    const { data } = await axios.get(`${API_BASE}/users`);
    const users = data.slice(0, LIMIT);

    
    tbody.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement("tr");
      const { id, name, username, email, address } = user;
      [id, name, username, email, address.city].forEach(value => {
        const td = document.createElement("td");
        td.textContent = value;
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al cargar visitantes:', error);
    tbody.innerHTML = '';
    const errRow = document.createElement('tr');
    const errTd = document.createElement('td');
    errTd.setAttribute('colspan', '5');
    errTd.textContent = 'No se pudieron cargar los visitantes.';
    errTd.classList.add('error');
    errRow.appendChild(errTd);
    tbody.appendChild(errRow);
  }
}
