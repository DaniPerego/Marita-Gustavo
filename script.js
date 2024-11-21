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

    // Mostrar el modal con la cuenta regresiva
    document.getElementById('countdownModal').style.display = 'flex';
    document.getElementById('eventTitleModal').textContent = eventTitle;

    // Iniciar la cuenta regresiva
    startCountdown(eventDate);
});

function startCountdown(eventDate) {
    const interval = setInterval(() => {
        const now = new Date();
        const timeLeft = eventDate - now;

        if (timeLeft <= 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = '¡El evento ya comenzó!';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}
