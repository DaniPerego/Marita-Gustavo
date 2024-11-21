document.getElementById('startCountdown').addEventListener('click', () => {
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDateTime = document.getElementById('eventDateTime').value;

    if (!eventTitle || !eventDateTime) {
        alert('Por favor, ingresa un título y selecciona una fecha y hora válidas para el evento.');
        return;
    }

    // Convertir la fecha seleccionada en un objeto Date
    const eventDate = new Date(eventDateTime);

    // Ocultar la interfaz de administración
    document.getElementById('adminContainer').style.display = 'none';

    // Crear una nueva ventana/página con la cuenta regresiva
    const countdownWindow = window.open('', '_blank', 'width=600,height=400');
    if (countdownWindow) {
        countdownWindow.document.write(generateCountdownPage(eventTitle, eventDate));
        countdownWindow.document.close();

        // Iniciar la cuenta regresiva en la nueva ventana
        startCountdownInWindow(countdownWindow, eventDate);
    } else {
        alert('No se pudo abrir la nueva ventana. Por favor, revisa la configuración del navegador.');
    }
});

// Generar el contenido HTML de la nueva ventana con título y estilos
function generateCountdownPage(eventTitle, eventDate) {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cuenta Regresiva - ${eventTitle}</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body class="popup">
            <div id="eventTitle">${eventTitle}</div>
            <div id="remainingText">FALTAN</div>
            <div id="countdown">
                <span id="days">00</span> Días
                <span id="hours">00</span> Horas
                <span id="minutes">00</span> Minutos
                <span id="seconds">00</span> Segundos
            </div>
        </body>
        </html>
    `;
}

// Iniciar la cuenta regresiva en la nueva ventana
function startCountdownInWindow(countdownWindow, eventDate) {
    const interval = setInterval(() => {
        const now = new Date();
        const timeLeft = eventDate - now;

        if (timeLeft <= 0) {
            clearInterval(interval);
            countdownWindow.document.getElementById('countdown').innerHTML = '¡El evento ya comenzó!';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownWindow.document.getElementById('days').textContent = days.toString().padStart(2, '0');
        countdownWindow.document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        countdownWindow.document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        countdownWindow.document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}
