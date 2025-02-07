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

// Função para converter datas no formato DD/MM/YYYY HH:mm para ISO 8601
function parseDate(input) {
    const parts = input.split(/[\s/:-]/); // Divide a entrada em partes (dia, mês, ano, hora, minuto)
    if (parts.length < 5) return null; // Verifica se há todas as partes necessárias

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Mês começa em 0 no JavaScript
    const year = parseInt(parts[2], 10);
    const hour = parseInt(parts[3], 10);
    const minute = parseInt(parts[4], 10);

    const date = new Date(year, month, day, hour, minute);
    if (isNaN(date.getTime())) return null; // Verifica se a data é válida

    return date.toISOString(); // Retorna no formato ISO 8601
}

// Evento de clique no botão "Iniciar Contagem"
document.getElementById('startButton').addEventListener('click', function () {
    const rawInput = document.getElementById('targetDateTime').value.trim();
    let targetDateTime;

    // Tenta converter a entrada para ISO 8601
    if (rawInput.includes('/')) {
        targetDateTime = parseDate(rawInput); // Converte DD/MM/YYYY HH:mm
    } else {
        targetDateTime = rawInput; // Assume que já está no formato ISO 8601
    }

    if (!targetDateTime) {
        alert('Por favor, insira uma data/hora válida no formato DD/MM/YYYY HH:mm ou YYYY-MM-DDTHH:mm.');
        return;
    }

    startCountdown(targetDateTime);
});

// Verificar se há uma data/hora salva no localStorage ao carregar a página
window.addEventListener('load', function () {
    const savedTargetDateTime = localStorage.getItem('targetDateTime');
    if (savedTargetDateTime) {
        const now = new Date().getTime();
        const savedTime = new Date(savedTargetDateTime).getTime();

        if (savedTime > now) {
            // Se a data/hora salva ainda for futura, continuar a contagem
            document.getElementById('targetDateTime').value = new Date(savedTargetDateTime).toLocaleString(); // Exibe no formato local
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
