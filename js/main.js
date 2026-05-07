import {getWeatherIcon} from './utils.js'
import {getCoordinate} from './api.js';
import {formatDate} from './utils.js';


export function updateUI(data) //carica i dati nella ui
{
    const temp= data.current_weather.temperature;
    const iconCode=data.current_weather.weathercode;
    const wind=data.current_weather.windspeed;

    const tempElement= document.getElementById('current-temp');
    const iconElement= document.getElementById('weather-icon');
    const windElement= document.getElementById('wind-speed');
    const dateElement= document.getElementById('current-date');

    if(tempElement) tempElement.innerText=temp //devo mettere una if se no un problema nell'html fa esplodere il tutto

    if(iconElement)
    {
        const iconClass= getWeatherIcon(iconCode);
        iconElement.className=`bi ${iconClass}`;
    }
    if(windElement) windElement.innerText= `Vento: ${wind} km/h`;

    if (dateElement) {
        dateElement.innerText = formatDate(data.current_weather.time);
    }

    const loader= document.getElementById('loader');
    if(loader) loader.classList.add('d-none');
}

export function showError(msg) //in caso di errori di qualsiasi tipo lo segnalo all'utente (l'errore e' una stringa)
{
    const container=document.getElementById('error-container');
    if(container)
    {
        container.innerHTML=`<div class="alert alert-danger">${msg}</div>`;
        container.classList.remove('d-none');
    }
}

function init() //carica il DOM
{
    document.getElementById('loader')?.classList.remove('d-none');
    getCoordinate();
}
document.addEventListener('DOMContentLoaded', init);
