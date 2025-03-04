// Função para formatar números com zero à esquerda
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// Função para atualizar o relógio
function updateClock() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    // Verificar se os elementos existem
    if (!timeElement || !dateElement) return;

    const now = new Date();
    // Extrair horas, minutos e segundos
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());
    // Formatar a data
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('pt-BR', options);
    // Atualizar o DOM
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = formattedDate;
}

// Inicializar o relógio apenas se os elementos estiverem presentes
if (document.getElementById('time') && document.getElementById('date')) {
    updateClock(); // Atualizar imediatamente
    setInterval(updateClock, 1000); // Atualizar a cada segundo
}

// Função para alternar o menu dropdown
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', () => {
            const menu = document.querySelector('.menu-hamburger');
            menu.classList.toggle('active');
        });
    }
});