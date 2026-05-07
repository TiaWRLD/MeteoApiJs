
import { getWeatherIcon, formatDate } from './utils.js';
import { getCoordinate } from './api.js';

export function updateUI(data) {
    console.log("Dati ricevuti:", data);

    const temp = data.current_weather.temperature;
    const iconCode = data.current_weather.weathercode;
    const wind = data.current_weather.windspeed;

    const tempElement = document.getElementById('current-temp');
    const iconElement = document.getElementById('weather-icon');
    const windElement = document.getElementById('wind-speed');
    const dateElement = document.getElementById('current-date');

    if (tempElement) tempElement.innerText = `${Math.round(temp)}°C`;

    if (iconElement) {
        const iconClass = getWeatherIcon(iconCode);
        iconElement.className = `bi ${iconClass} text-primary`;
    }

    if (windElement) windElement.innerText = `Vento: ${wind} km/h`;

    if (dateElement) {
        dateElement.innerText = formatDate(data.current_weather.time);
    }

    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('d-none');
}

export function showError(msg) {
    const container = document.getElementById('error-container');
    if (container) {
        container.innerHTML = `<div class="alert alert-danger shadow-sm">${msg}</div>`;
        container.classList.remove('d-none');
    }
    document.getElementById('loader')?.classList.add('d-none');
}

function init() {
    getCoordinate(updateUI, showError);
}

document.addEventListener('DOMContentLoaded', init);