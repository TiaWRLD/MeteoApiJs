export function getWeatherIcon(code) //serve a inserire l'icona giusta in base al codice che perndo
{
    const mapping = {
        0: 'bi-brightness-high',      // Sereno
        1: 'bi-cloud-sun',             // Prevalentemente sereno
        2: 'bi-cloud-sun',             // Parzialmente nuvoloso
        3: 'bi-cloud',                 // Nuvoloso
        45: 'bi-cloud-fog',            // Nebbia
        48: 'bi-cloud-fog',            // Nebbia rime
        51: 'bi-cloud-drizzle',        // Pioggerella
        61: 'bi-cloud-rain',           // Pioggia leggera
        71: 'bi-snow',                 // Neve
        95: 'bi-cloud-lightning-rain'  // Temporale
    };


    return mapping[code] || 'bi-question-circle';
}

export function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'short' });
}