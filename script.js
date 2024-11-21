document.addEventListener('DOMContentLoaded', () => {
    // Verificar si ya hay un evento guardado en el LocalStorage
    const savedEventTitle = localStorage.getItem('eventTitle');
    const savedEventDate = localStorage.getItem('eventDate');

    if (savedEventTitle && savedEventDate) {
        // Si hay datos guardados, iniciar la cuenta regresiva con esos datos
        document.getElementById('eventTitleModal').textContent = savedEventTitle;
        const eventDate = new Date(savedEventDate);
        document.getElementById('remainingText').textContent = 'FALTAN';
        startCountdown(eventDate);
        document.getElementById('countdownModal').style.display = 'flex';  // Mostrar el modal
        document.getElementById('adminContainer').style.display = 'none'; // Ocultar la interfaz de administración
    } else {
        // Si no hay datos guardados, mostrar la interfaz de administración
        document.getElementById('adminContainer').style.display = 'block';
        document.getElementById('countdownModal').style.display = 'none'; // Ocultar el modal
    }

    // Evento para iniciar la cuenta regresiva
    document.getElementById('startCountdown').addEventListener('click', () => {
        const eventTitle = document.getElementById('eventTitle').value;
        const eventDateTime = document.getElementById('eventDateTime').value;

        if (!eventTitle || !eventDateTime) {
            alert('Por favor, ingresa un título y selecciona una fecha y hora válidas para el evento.');
            return;
        }

        // Convertir la fecha seleccionada en un objeto Date
        const eventDate = new Date(eventDateTime);

        // Guardar los datos en el LocalStorage
        localStorage.setItem('eventTitle', eventTitle);
        localStorage.setItem('eventDate', eventDate);

        // Mostrar el modal con la cuenta regresiva
        document.getElementById('eventTitleModal').textContent = eventTitle;
        document.getElementById('remainingText').textContent = 'FALTAN';

        // Ocultar la interfaz de administración y mostrar el modal
        document.getElementById('adminContainer').style.display = 'none';
        document.getElementById('countdownModal').style.display = 'flex';

        // Iniciar la cuenta regresiva
        startCountdown(eventDate);
    });
});

// Función para iniciar la cuenta regresiva
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

