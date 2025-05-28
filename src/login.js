// src/login.js
import template from "./login.html";
import "./login.css";
import config   from "./config.yaml";    // solo si sigues usando YAML

console.log(config.titulo, config.descripcion);

// registra tu SW como antes…
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((reg) => console.log("SW Registrado", reg))
      .catch((err) => console.log("SW no registrado", err));
  });
}

// inyecta el HTML
document.getElementById("root").innerHTML = template;

// resto de tu lógica de filtros, sliders y canvas…
