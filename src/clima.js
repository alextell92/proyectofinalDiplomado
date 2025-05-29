import axios from 'axios';
import "./clima.css";

const API_KEY = 'c27c93ab9dbe74ae2c2173d3b80ba1c7'; 

export function renderClima() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  // Contenedor principal
  const climaView = document.createElement("div");
  climaView.classList.add("clima-view");

   

  // Header 
  const header = document.createElement("header");
  const backBtn = document.createElement("button");
  const h1 = document.createElement("h1");
  h1.textContent = "Clima de Hoy";

  backBtn.textContent = "← Volver al Home";
  backBtn.addEventListener("click", () => {
    import("./index.js").then(module => module.renderHome());
  });
  header.appendChild(backBtn);
  header.appendChild(h1);
  // ciudad
  const cityLabel = document.createElement('label');
  cityLabel.textContent = 'Ciudad: ';
  const cityInput = document.createElement('input');
  cityInput.type = 'text';
  cityInput.placeholder = 'Guanajuato'; 
  cityInput.value = 'Guanajuato'; 

  const getBtn = document.createElement('button');
  getBtn.textContent = 'Obtener Clima';
  getBtn.addEventListener('click', () => loadClima(cityInput.value));

  const controls = document.createElement('div');
  controls.classList.add('clima-controls');
  controls.append(cityLabel, cityInput, getBtn);

  // Contenedor principal
  const main = document.createElement('main');

  main.append(controls);

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
   
    //   q: city,
    //   appid: API_KEY,
    //   units: 'metric',
    //   lang: 'es'
    // });

    // console.log(params);
    

    // const url = `${API_BASE}?${params.toString()}`;
   
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    const { data } = await axios.get(url);


    // Parseo de respuesta
    const nombre = data.name;
    const descripcion = data.weather[0].description;
    const temp = data.main.temp;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const viento = data.wind.speed;
    const humedad = data.main.humidity;

    container.innerHTML = `
      <p><strong>Ciudad:</strong> ${nombre}</p>
      <p><strong>Tiempo:</strong> ${descripcion}</p>
      <p><strong>Temperatura:</strong> ${temp.toFixed(1)}°C (min ${tempMin.toFixed(1)}°C / max ${tempMax.toFixed(1)}°C)</p>
      <p><strong>Humedad:</strong> ${humedad}%</p>
      <p><strong>Viento:</strong> ${viento} m/s</p>
    `;
  } catch (error) {
    console.error('Error al cargar clima:', error);
    container.innerHTML = '<p class="error">No se pudo obtener el clima.Revisa la ciudad</p>';
  }
}
