// Função para salvar a data/hora alvo no localStorage
function saveTargetDate(targetDate) {
    localStorage.setItem('targetDate', targetDate);
}

// Função para recuperar a data/hora alvo do localStorage
function getTargetDate() {
    const savedDate = localStorage.getItem('targetDate');
    return savedDate ? parseInt(savedDate) : null;
}

// Variáveis globais
let targetDate = getTargetDate(); // Recuperar a data/hora alvo salva
let countdownInterval;
let audio;

// Função para atualizar a contagem regressiva
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        document.getElementById('countdown').textContent = "00:00:00:00";
        document.getElementById('message').textContent = "Tempo esgotado!";
        clearInterval(countdownInterval); // Parar a contagem
        localStorage.removeItem('targetDate'); // Limpar o localStorage

        // Reproduzir o áudio
        if (audio) {
            audio.play().catch((error) => {
                console.error("Erro ao reproduzir o áudio:", error);
            });
        }

        return;
    }

    // Calcular dias, horas, minutos e segundos restantes
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Formatar como dd:hh:mm:ss
    const formattedTime = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Atualizar o DOM
    document.getElementById('countdown').textContent = formattedTime;
}

// Verificar se já existe uma contagem em andamento
if (targetDate) {
    // Se houver uma data/hora alvo salva, iniciar a contagem regressiva
    countdownInterval = setInterval(updateCountdown, 1000);
} else {
    // Se não houver uma data/hora alvo salva, zerar a contagem
    document.getElementById('countdown').textContent = "00:00:00:00";
    document.getElementById('message').textContent = "Defina uma data/hora alvo.";
}

// Adicionar evento ao botão de iniciar
document.getElementById('startButton').addEventListener('click', () => {
    const inputDateTime = document.getElementById('targetDateTime').value;

    if (!inputDateTime) {
        alert("Por favor, selecione uma data/hora alvo.");
        return;
    }

    // Converter o valor do input para timestamp
    const newTargetDate = new Date(inputDateTime).getTime();

    if (isNaN(newTargetDate)) {
        alert("Data/hora inválida. Por favor, tente novamente.");
        return;
    }

    // Salvar a nova data/hora alvo
    targetDate = newTargetDate;
    saveTargetDate(targetDate);

    // Carregar o áudio após a interação do usuário
    audio = new Audio('assets/audio/contagem.mp3');

    // Reiniciar a contagem regressiva
    clearInterval(countdownInterval); // Parar qualquer contagem anterior
    countdownInterval = setInterval(updateCountdown, 1000);

    // Atualizar a mensagem
    document.getElementById('message').textContent = "Tempo restante...";
});