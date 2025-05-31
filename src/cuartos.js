import jsyaml from "js-yaml";
import "./cuartos.css";
import { renderHeader } from "./header.js";

export async function renderCuartos() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  // Contenedor principal
  const container = document.createElement("div");
  container.classList.add("view-container");

  // const header = document.createElement("header");

  renderHeader({
    title: "Lista de Cuartos",
    backButton: {
      label: "← Volver al Home",
      action: () => {
        import("./index.js")
          .then((module) => module.renderHome())
          .catch((err) => console.error("Error cargando home:", err));
      },
    },
  });

  // Form filtros
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
  form.append(selectCama, selectHuespedes, selectBalcon);

  const divForm = document.createElement("div");
  divForm.classList.add("divForm");

  divForm.appendChild(form);

  // Grid para habitaciones
  const datagrid = document.createElement("div");
  datagrid.classList.add("datagrid");

  // container.append(header, datagrid);
  // root.appendChild(header);
  root.appendChild(divForm);
  root.appendChild(datagrid);

  // Carga de archivo YAML
  try {
    const response = await fetch("/cuartos.yaml");
    const text = await response.text();
    const rooms = jsyaml.load(text);

    // filtrar y mostrar
    const displayRooms = () => {
      datagrid.innerHTML = "";
      const tipo = selectCama.value;
      const maxH = selectHuespedes.value;
      const balcon = selectBalcon.value;

      rooms.forEach((room) => {
        if (tipo && room.cama !== tipo) return;
        if (maxH) {
          const cap = room.huespedes;
          if (maxH === "3+" ? cap < 3 : cap !== Number(maxH)) return;
        }
        if (balcon && (room.balcon ? "sí" : "no") !== balcon) return;

        const card = document.createElement("div");
        card.classList.add("room-card");
        card.innerHTML = `
          <img src="${room.image}" alt="Cuarto ${room.numero}">
          <h4>Cuarto ${room.numero}</h4>
          <p>Cama: ${room.cama}</p>
          <p>Huspedes: ${room.huespedes}</p>
          <p>Balcón: ${room.balcon ? "Sí" : "No"}</p>
        `;
        datagrid.appendChild(card);
      });
    };

    // evento change
    selectCama.addEventListener("change", displayRooms);
    selectHuespedes.addEventListener("change", displayRooms);
    selectBalcon.addEventListener("change", displayRooms);

    displayRooms();
  } catch (err) {
    console.error("Error cargando cuartos YAML:", err);
    datagrid.innerHTML =
      '<p class="error">No se pudieron cargar los cuartos.</p>';
  }
}
