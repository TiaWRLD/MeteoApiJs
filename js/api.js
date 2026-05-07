export function getCoordinate(callbackSuccess, callbackError) {
    if (!navigator.geolocation) {
        callbackError("Geolocalizzazione non supportata");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            fetchData(latitude, longitude, callbackSuccess, callbackError);
        },
        err => {
            let msg;
            switch (err.code) {
                case err.PERMISSION_DENIED: msg = 'Accesso alla posizione negato'; break;
                case err.POSITION_UNAVAILABLE: msg = 'Posizione non disponibile'; break;
                case err.TIMEOUT: msg = 'Tempo scaduto'; break;
                default: msg = 'Errore sconosciuto';
            }
            callbackError(msg);
        }
    );
}

function fetchData(lat, long, callbackSuccess, callbackError) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        })
        .then(json => callbackSuccess(json)) // Qui passiamo i dati al main
        .catch(error => callbackError("Errore nel recupero dati meteo"));
}