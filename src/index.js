import "./index.css";
import { renderClima } from "./clima";

import { renderVisitantes } from "./visitantes";

import {renderCuartos} from "./cuartos";


import { renderBebidasCategoria } from "./bebidas";


import { renderComentarios } from "./comentarios";


import { renderIntranet } from "./intranet";


import { renderLogin } from "./login";

export function renderHome() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";
  const homeView = document.createElement("div");
  homeView.classList.add("home-view");

  const header = document.createElement("header");

const logo = document.createElement("div");
logo.classList.add("logo");

const img = document.createElement("img");
img.src = "./img/hotel.png";   
img.alt = "Hotel";          
img.classList.add("logoImg");    

logo.appendChild(img);



  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  const menuItems = [
    { text: "Clima", action: () => renderClima() },
    { text: "Bebidas", action: () => renderBebidasCategoria() },
    { text: "Habitaciones", action: () => renderCuartos()},
     { text: "Comentarios", action: () => renderComentarios() },
    { text: "Intranet", action: () =>renderLogin() },
    // { text: "Intranet", action: () =>renderVisitantes() },
  ];

  menuItems.forEach(({ text, action }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = text;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      action();
    });
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  header.appendChild(logo);
  header.appendChild(nav);

  const main = document.createElement("main");
  const banner = document.createElement("div");
  banner.classList.add("banner");


  const span = document.createElement("span");
  span.textContent = "Photo";


  banner.appendChild(span);
  main.appendChild(banner);

//   const footer = document.createElement("footer");
//   footer.textContent = "FOOTER";

  homeView.appendChild(header);
  homeView.appendChild(main);
//   homeView.appendChild(footer);
  root.appendChild(homeView);
}

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
});
