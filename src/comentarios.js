import axios from "axios";
import { renderHome } from "./index.js";
import "./comentarios.css";
import { renderIntranet } from "./intranet.js";

import { renderHeader } from "./header.js";

const API_BASE = "https://jsonplaceholder.typicode.com";
const LIMIT = 50;

export async function renderComentarios() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  renderHeader({
    title: "Comentarios",
    backButton: {
      label: "← Volver a intranet",
      action: () => {
        import("./intranet.js")
          .then((module) => module.renderIntranet())
          .catch((err) => console.error("Error cargando intranet:", err));
      },
    },
  });

  // Contenedor de comentarios
  const list = document.createElement("div");
  list.classList.add("comment-list");
  list.innerHTML = `<p>Cargando comentarios...</p>`;

  // container.append(backBtn, list);
  //root.appendChild(header)
  root.appendChild(list);

  try {
    const { data } = await axios.get(`${API_BASE}/comments`);
    const comments = data.slice(0, LIMIT);

    list.innerHTML = "";
    comments.forEach((comment) => {
      const card = document.createElement("div");
      card.classList.add("comment-card");
      card.innerHTML = `
        <h4 class="comment-name">${comment.name}</h4>
        <p class="comment-email">${comment.email}</p>
        <p class="comment-body">${comment.body}</p>
      `;
      list.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar comentarios:", error);
    list.innerHTML =
      '<p class="error">No se pudieron cargar los comentarios.</p>';
  }
}
