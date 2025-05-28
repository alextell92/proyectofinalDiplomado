import { renderHome } from "./index.js"; // Asegúrate que esto apunte a tu función home
import "./cuartos.css";
export function renderCuartos() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("view-container");

  const style = document.createElement("style");

  document.head.appendChild(style);

  const title = document.createElement("div");
  title.classList.add("view-title");
  title.innerHTML = "&lt;&lt;view&gt;&gt; CuartosListView";

  const form = document.createElement("div");
  form.classList.add("filter-form");

  const selectCama = document.createElement("select");
  selectCama.innerHTML = `
    <option value="">Tipo de Cama</option>
    <option value="individual">Individual</option>
    <option value="matrimonial">Matrimonial</option>
    <option value="king">King</option>
  `;

  const selectHuespedes = document.createElement("select");
  selectHuespedes.innerHTML = `
    <option value="">Máx. Huéspedes</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3+">3 o más</option>
  `;

  const selectBalcon = document.createElement("select");
  selectBalcon.innerHTML = `
    <option value="">¿Balcón?</option>
    <option value="sí">Sí</option>
    <option value="no">No</option>
  `;

  form.appendChild(selectCama);
  form.appendChild(selectHuespedes);
  form.appendChild(selectBalcon);

  const datagrid = document.createElement("div");
  datagrid.classList.add("datagrid");

  // Cuartos simulados
  for (let i = 101; i <= 106; i++) {
    const card = document.createElement("div");
    card.classList.add("room-card");
    card.innerHTML = `
      <img src="https://via.placeholder.com/150" alt="Cuarto ${i}">
      <h4>Cuarto ${i}</h4>
    `;
    datagrid.appendChild(card);
  }

  const backWrapper = document.createElement("div");
  backWrapper.classList.add("back-button");
  const backBtn = document.createElement("button");
  backBtn.textContent = "← Regresar al inicio";
  backBtn.addEventListener("click", () => {
    renderHome();
  });
  backWrapper.appendChild(backBtn);

  container.appendChild(title);
  container.appendChild(form);
  container.appendChild(datagrid);
  container.appendChild(backWrapper);
  root.appendChild(container);
}
