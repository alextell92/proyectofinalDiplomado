import { renderIntranet } from "./intranet.js";
import "./login.css";
import yaml from "js-yaml";

import { renderHome } from "./index.js";

export function renderLogin() {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("login-container");

  const title = document.createElement("h2");
  title.classList.add("login-title");
  title.textContent = "Iniciar sesión";

  const form = document.createElement("form");
  form.classList.add("login-form");

  const userLabel = document.createElement("label");
  userLabel.textContent = "Usuario";
  const userInput = document.createElement("input");
  userInput.type = "text";

  const passLabel = document.createElement("label");
  passLabel.textContent = "Contraseña";
  const passInput = document.createElement("input");
  passInput.type = "password";

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Iniciar sesión";

  const regresarBtn = document.createElement("button");
  regresarBtn.type = "button";
  regresarBtn.textContent = "Regresar";

  regresarBtn.textContent = "← Regresar al inicio";
  regresarBtn.addEventListener("click", () => renderHome());

  form.appendChild(userLabel);
  form.appendChild(userInput);
  form.appendChild(passLabel);
  form.appendChild(passInput);
  form.appendChild(submitBtn);
  form.appendChild(regresarBtn);

  form.addEventListener("submit", async (e) => {
   
    e.preventDefault();
    const usuarioIngresado = userInput.value.trim();
    const passIngresada = passInput.value.trim();

    try {
      const response = await fetch("usuarios.yaml");
      console.log(response);
      const yamlText = await response.text();
      const data = yaml.load(yamlText);

      const usuarioValido = data.usuarios.find(
        (u) => u.usuario === usuarioIngresado && u.contraseña === passIngresada
      );
      console.log(usuarioIngresado);
      console.log(passIngresada);
      console.log(usuarioValido);

      if (usuarioValido) {
        renderIntranet();
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error al cargar usuarios.yaml:", err);
      alert("No se pudo validar la sesión.");
    }
  });

  container.appendChild(title);
  container.appendChild(form);
  root.appendChild(container);
}
