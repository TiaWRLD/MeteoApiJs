import showError from './main';
import updateUI from './main';

function getCoordinate() //prende le coordinate da cui fare la chiamata api (la posizione dell'utente)
{
    if (!navigator.geolocation)     // se non posso prendere la posizione mando l'errore
    {
        showError("Geolocalizzazione non supportata");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        position => { //logica se la chiamata va a buon fine
            const {latitude, longitude} = position.coords;
            fetchData(latitude, longitude);
        },
        err => {//logica se la chiamata fallisce: assegno il valore del messaggio di errore con uno switch
            let msg;
            switch (err.code)
            {
                case err.PERMISSION_DENIED:
                    msg='Accesso alla posizione negato'
                    break;
                case err.POSITION_UNAVAILABLE:
                    msg='Posizione non disponibile'
                    break;
                case err.TIMEOUT:
                    msg='Tempo scaduto'
                    break;
                default:
                    msg='Errore sconosciuto'
            }
            showError(msg)
        }
    );
}

function fetchData(lat, long) //prende latitudine e longitudine per fare la chiamata api
{

    // l'url non necessita di essere modificato e varia con i parametri
    const url= `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;

    //chiamo le api del meteo
    fetch(url)
        .then(response =>
        {
            if(!response.ok)
            {
                showError(response.statusText);
            }
            return response.json();
        })
        .then(json =>
            {
                updateUI(json);
            })
        .catch(error =>
            {
                showError("Errore nell\'aggiornamento dell\'interfaccia");
            })
}