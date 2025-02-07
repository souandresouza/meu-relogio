// Variáveis globais
let targetTime = null;
let interval = null;

// Função para atualizar a contagem regressiva
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
        clearInterval(interval);
        document.getElementById('countdown').textContent = '00:00:00:00';
        document.getElementById('message').textContent = 'Tempo esgotado!';
        localStorage.removeItem('targetDateTime'); // Remove a data/hora salva após o término
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').textContent = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('message').textContent = 'Tempo restante...';
}

// Função para iniciar a contagem regressiva
function startCountdown(targetDateTime) {
    targetTime = new Date(targetDateTime).getTime();

    // Salvar a data/hora alvo no localStorage no formato ISO 8601
    localStorage.setItem('targetDateTime', targetDateTime);

    // Limpar qualquer intervalo anterior
    if (interval) clearInterval(interval);

    // Iniciar a contagem regressiva
    updateCountdown(); // Atualiza imediatamente
    interval = setInterval(updateCountdown, 1000);
}

// Evento de clique no botão "Iniciar Contagem"
document.getElementById('startButton').addEventListener('click', function () {
    const rawInput = document.getElementById('targetDateTime').value.trim();
    if (!rawInput) {
        alert('Por favor, insira uma data/hora válida.');
        return;
    }

    // A entrada já está no formato ISO 8601 (YYYY-MM-DDTHH:mm)
    startCountdown(rawInput);
});

// Verificar se há uma data/hora salva no localStorage ao carregar a página
window.addEventListener('load', function () {
    const savedTargetDateTime = localStorage.getItem('targetDateTime');
    if (savedTargetDateTime) {
        const now = new Date().getTime();
        const savedTime = new Date(savedTargetDateTime).getTime();

        if (savedTime > now) {
            // Se a data/hora salva ainda for futura, continuar a contagem
            document.getElementById('targetDateTime').value = savedTargetDateTime; // Define o valor do input
            startCountdown(savedTargetDateTime); // Iniciar a contagem regressiva
        } else {
            // Se a data/hora salva já expirou, limpar o localStorage
            localStorage.removeItem('targetDateTime');
            document.getElementById('countdown').textContent = '00:00:00:00';
            document.getElementById('message').textContent = 'Tempo esgotado!';
        }
    } else {
        // Caso não haja data/hora salva, exibir mensagem padrão
        document.getElementById('countdown').textContent = '00:00:00:00';
        document.getElementById('message').textContent = 'Tempo restante...';
    }
});
