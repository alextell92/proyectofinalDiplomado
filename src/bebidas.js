import axios from "axios";
import { renderHome } from "./index.js";
import "./bebidas.css";

const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1";
const LIMIT = 20;

export async function renderBebidasCategoria() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  // // Título de la vista
  // const title = document.createElement("div");
  // title.classList.add("view-title");
  // title.textContent = "Bebidas";

  // el Bar
  const widgetLabel = document.createElement("div");
  widgetLabel.classList.add("widget-label");
  const h1 = document.createElement("h1");
  h1.textContent = "El Bar (Bebidas)";
  // widgetLabel.textContent = "El Bar (Bebidas)";

  // // Barra superioor con botones tambien filtros
  // const topBar = document.createElement("div");
  // topBar.classList.add("top-bar");
  // const backBtn = document.createElement("button");
  // backBtn.innerHTML = "← Volver";
  // backBtn.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   renderHome();
  // });

  const header = document.createElement("header");
  const backBtn = document.createElement("button");
  backBtn.textContent = "← Volver al Home";
  backBtn.addEventListener("click", () => {
    import("./index.js").then((module) => module.renderHome());
  });
  header.appendChild(backBtn);

  const filterSelect = document.createElement("select");
  filterSelect.innerHTML = `
    <option value="filter.php?c=Cocktail">Cócteles</option>
    <option value="filter.php?a=Non_Alcoholic">Sin Alcohol</option>
    <option value="filter.php?a=Alcoholic">Con Alcohol</option>
  `;

  header.appendChild(backBtn);
  header.appendChild(filterSelect);
  header.appendChild(h1);

  // Contenedor de tarjetas de cada una de las bebidasa
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  // agrego cada elemento a la raiz para que se muestre e pantalla.
  // root.appendChild(title);

  root.appendChild(header);
  root.appendChild(widgetLabel);
  root.appendChild(cardContainer);

  // Carga inicial de bebidas y al cambiar filtro
  loadBebidas(filterSelect.value, cardContainer);

  filterSelect.addEventListener("change", () =>
    loadBebidas(filterSelect.value, cardContainer)
  );
}

async function loadBebidas(filtroDeAPi, container) {
  container.innerHTML = "<p>Cargando bebidas...</p>";

  try {
    console.log(filtroDeAPi);

    const { data } = await axios.get(`${API_BASE}/${filtroDeAPi}`);
    let drinks = data.drinks || [];
    drinks = drinks.slice(0, LIMIT);

    container.innerHTML = "";
    drinks.forEach((drink) => {
      const card = document.createElement("div");
      card.classList.add("drink-card");
      card.style.cursor = "pointer";
      card.innerHTML = `
        <div class="card-image">
          <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
        </div>
        <div class="card-content">
          <h3 class="card-title">${drink.strDrink}</h3>
        </div>
      `;
      card.addEventListener("click", () => renderDetalleBebida(drink.idDrink));
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar bebidas:", error);
    container.innerHTML = '<p class="error">Error al cargar las bebidas.</p>';
  }
}

async function renderDetalleBebida(id) {
  const root = document.getElementById("root");
  root.innerHTML = "";

  //   const contenedor = document.createElement('div');
  //   contenedor.classList.add('contenedor')
  //  para regresar al listado
  const backBtn = document.createElement("button");
  backBtn.textContent = "← Volver a listado";
  backBtn.addEventListener("click", renderBebidasCategoria);
  backBtn.style.margin = "1rem 0";

  const detalleContainer = document.createElement("div");
  detalleContainer.classList.add("detalle-bebida");

  const h1 = document.createElement("h1");
  h1.textContent = "Preparacion e ingredientes";

  const header = document.createElement("header");

  header.appendChild(backBtn);

  header.appendChild(h1);
  root.appendChild(header);
  root.appendChild(detalleContainer);

  try {
    const { data } = await axios.get(`${API_BASE}/lookup.php?i=${id}`);
    const drink = data.drinks[0];

    // titulos
    const title = document.createElement("h2");
    title.textContent = drink.strDrink;

    const img = document.createElement("img");
    img.src = drink.strDrinkThumb;
    img.alt = drink.strDrink;
    img.classList.add("imagenDetalle");

    // Instrucciones
    const instr = document.createElement("p");
    instr.innerHTML = `<strong>Preparación:</strong> ${drink.strInstructions}`;

    // Lista de ingredientes
    const ul = document.createElement("ul");
    ul.classList.add("listaIngresdientes");
    for (let i = 1; i <= 15; i++) {
      const ing = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ing) {
        const li = document.createElement("li");
        li.textContent = `${ing}${measure ? ` - ${measure}` : ""}`;
        ul.appendChild(li);
      }
    }

    detalleContainer.appendChild(title);
    detalleContainer.appendChild(img);
    detalleContainer.appendChild(instr);
    detalleContainer.appendChild(ul);

    //    contenedor.appendChild(detalleContainer);
  } catch (error) {
    console.error("Error al cargar detalle:", error);
    detalleContainer.innerHTML =
      '<p class="error">No se pudo cargar el detalle de la bebida.</p>';
  }
}
