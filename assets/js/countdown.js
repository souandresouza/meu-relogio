document.getElementById('startButton').addEventListener('click', function () {
    const targetDateTime = document.getElementById('targetDateTime').value;
    if (!targetDateTime) {
        alert('Por favor, defina uma data/hora alvo.');
        return;
    }

    const targetTime = new Date(targetDateTime).getTime();
    const countdownElement = document.getElementById('countdown');
    const messageElement = document.getElementById('message');

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance <= 0) {
            clearInterval(interval);
            countdownElement.textContent = '00:00:00:00';
            messageElement.textContent = 'Tempo esgotado!';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        messageElement.textContent = 'Tempo restante...';
    }, 1000);
});
