import "./visitantes.css";

export function renderVisitantes() {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("visitantes-container");

  const title = document.createElement("h2");
  title.classList.add("visitantes-title");
  title.textContent = "<<view>> VisitantesView";

  const tableWrapper = document.createElement("div");
  tableWrapper.classList.add("table-wrapper");

  const table = document.createElement("table");
  table.classList.add("visitantes-table");

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  ["ID", "Nombre", "Fecha Entrada", "Fecha Salida", "Habitación", "Status"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  // Puedes reemplazar este arreglo con tus datos reales
  const visitantes = [
    { id: "001", nombre: "Juan Pérez", entrada: "2025-05-01", salida: "2025-05-05", habitacion: "101", status: "Activo" },
    { id: "002", nombre: "Ana López", entrada: "2025-05-03", salida: "2025-05-06", habitacion: "102", status: "Finalizado" }
  ];

  visitantes.forEach(v => {
    const row = document.createElement("tr");
    [v.id, v.nombre, v.entrada, v.salida, v.habitacion, v.status].forEach(text => {
      const td = document.createElement("td");
      td.textContent = text;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  container.appendChild(title);
  container.appendChild(tableWrapper);
  root.appendChild(container);
}
