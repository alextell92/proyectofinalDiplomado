import axios from 'axios';
import { renderHome } from "./index.js"; // Ajusta la ruta según tu proyecto
import "./comentarios.css";

const API_BASE = 'https://jsonplaceholder.typicode.com';
const LIMIT = 20; // Número máximo de comentarios a mostrar

export async function renderComentarios() {
  const root = document.getElementById("root");
  if (!root) return;

  // Limpia contenido previo
  root.innerHTML = "";

  // Contenedor principal
  const container = document.createElement("div");
  container.classList.add("view-container");



  // Botón de regresar
  const backBtn = document.createElement("button");
  backBtn.classList.add("back-button");
  backBtn.textContent = "← Regresar al inicio";
  backBtn.addEventListener("click", () => {
    renderHome();
  });



    // Header 
  const header = document.createElement("header");
  
  const h1 = document.createElement("h1");
  h1.textContent = "Comentarios";


  header.appendChild(backBtn);
  header.appendChild(h1);




  // Contenedor de comentarios
  const list = document.createElement("div");
  list.classList.add("comment-list");
  list.innerHTML = `<p>Cargando comentarios...</p>`;

  // container.append(backBtn, list);
  root.appendChild(header)
  root.appendChild(list);


  try {
    const { data } = await axios.get(`${API_BASE}/comments`);
    const comments = data.slice(0, LIMIT);

    list.innerHTML = '';
    comments.forEach(comment => {
      const card = document.createElement('div');
      card.classList.add('comment-card');
      card.innerHTML = `
        <h4 class="comment-name">${comment.name}</h4>
        <p class="comment-email">${comment.email}</p>
        <p class="comment-body">${comment.body}</p>
      `;
      list.appendChild(card);
    });
  } catch (error) {
    console.error('Error al cargar comentarios:', error);
    list.innerHTML = '<p class="error">No se pudieron cargar los comentarios.</p>';
  }
}
