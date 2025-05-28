import "./clima.css";

export function renderClima() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  const climaView = document.createElement("div");
  climaView.classList.add("clima-view");

  const header = document.createElement("header");
  const backBtn = document.createElement("button");
  backBtn.textContent = "← Volver al Home";
  backBtn.addEventListener("click", () => {
    import("./index.js").then(module => module.renderHome());
  });

  header.appendChild(backBtn);

  const main = document.createElement("main");
  const h1 = document.createElement("h1");
  h1.textContent = "Clima de Hoy";
  main.appendChild(h1);

  climaView.appendChild(header);
  climaView.appendChild(main);
  root.appendChild(climaView);
}
