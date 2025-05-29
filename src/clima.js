import axios from 'axios';
import "./clima.css";

const API_BASE = 'https://www.7timer.info/bin/api.pl';

export function renderClima() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  // Container
  const climaView = document.createElement("div");
  climaView.classList.add("clima-view");

  // Header con botón de regreso
  const header = document.createElement("header");
  const backBtn = document.createElement("button");
  backBtn.textContent = "← Volver al Home";
  backBtn.addEventListener("click", () => {
    import("./index.js").then(module => module.renderHome());
  });
  header.appendChild(backBtn);

  // Selector de ciudad
  const cityLabel = document.createElement('label');
  cityLabel.textContent = 'Ciudad: ';
  const cityInput = document.createElement('input');
  cityInput.type = 'text';
  cityInput.placeholder = 'e.g. London';
  cityInput.value = 'London';
  cityInput.style.marginRight = '0.5rem';

  const getBtn = document.createElement('button');
  getBtn.textContent = 'Obtener Clima';
  getBtn.addEventListener('click', () => loadClima(cityInput.value));

  const controls = document.createElement('div');
  controls.classList.add('clima-controls');
  controls.append(cityLabel, cityInput, getBtn);

  // Contenedor principal
  const main = document.createElement("main");
  const h1 = document.createElement("h1");
  h1.textContent = "Clima de Hoy";
  main.append(h1, controls);

  // Contenedor de resultados
  const resultContainer = document.createElement('div');
  resultContainer.classList.add('clima-result');
  main.appendChild(resultContainer);

  climaView.append(header, main);
  root.appendChild(climaView);

  // Carga inicial
  loadClima(cityInput.value);
}

async function loadClima(city) {
  const container = document.querySelector('.clima-result');
  container.innerHTML = '<p>Cargando clima...</p>';

  try {
    // Coordenadas simples para ejemplo; en producción usar geocoding
    const coords = getCoordsForCity(city);
    const params = new URLSearchParams({
      product: 'civillight', // tipo de pronóstico
      lat: coords.lat,
      lon: coords.lon,
      unit: 'metric',
      output: 'json',
      tzshift: '0'
    });({
      lat: coords.lat,
      lon: coords.lon,
      unit: 'metric',
      output: 'json',
      tzshift: '0'
    });

    const url = `${API_BASE}?${params.toString()}`;
    const { data } = await axios.get(url);

    // El primer periodo es el clima actual aproximado
    const now = data.dataseries[0];

    container.innerHTML = `
      <p><strong>Ciudad:</strong> ${city}</p>
      <p><strong>Fecha:</strong> ${now.date}</p>
      <p><strong>Tiempo:</strong> ${now.weather}</p>
      <p><strong>Temperatura:</strong> Min ${now.temp2m.min}°C - Max ${now.temp2m.max}°C</p>
      <p><strong>Viento:</strong> ${now.wind10m_max} m/s</p>
    `;
  } catch (error) {
    console.error('Error al cargar clima:', error);
    container.innerHTML = '<p class="error">No se pudo obtener el clima.</p>';
  }
}

function getCoordsForCity(city) {
  // Mapea algunas ciudades a coordenadas (ejemplo)
  const map = {
    "London": { lat: 51.5074, lon: -0.1278 },
    "Mexico City": { lat: 19.4326, lon: -99.1332 },
    "New York": { lat: 40.7128, lon: -74.0060 },
    "Tokyo": { lat: 35.6895, lon: 139.6917 }
  };
  return map[city] || map['London'];
}
