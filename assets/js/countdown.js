// Função para reproduzir um áudio específico
function tocarAudio(caminho) {
    const audio = new Audio(caminho);
    audio.play().catch(error => {
        console.error('Erro ao reproduzir o áudio:', error);
    });
}

// Função para formatar o tempo (dias, horas, minutos, segundos)
function formatarTempo(tempo) {
    const dias = Math.floor(tempo / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tempo % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tempo % (1000 * 60)) / 1000);

    return `${String(dias).padStart(2, '0')}:${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

// Função principal para iniciar a contagem regressiva
function iniciarContagemRegressiva(dataAlvo) {
    const countdownElement = document.getElementById('countdown');
    const messageElement = document.getElementById('message');

    const intervalo = setInterval(() => {
        const agora = new Date().getTime();
        const diferenca = dataAlvo - agora;

        if (diferenca <= 0) {
            clearInterval(intervalo);
            countdownElement.textContent = '00:00:00:00';
            messageElement.textContent = 'Tempo esgotado!';
            tocarAudio('assets/audio/contagem.mp3'); // Reproduz o áudio final
            localStorage.removeItem('dataAlvo'); // Remove a data alvo do localStorage
        } else {
            countdownElement.textContent = formatarTempo(diferenca);
            messageElement.textContent = 'D : H : M : S'; // Mantém o formato enquanto a contagem está ativa
        }
    }, 1000); // Atualiza a cada segundo
}

// Evento para iniciar a contagem regressiva ao clicar no botão "Iniciar"
document.getElementById('startButton').addEventListener('click', () => {
    // Reproduz o áudio de teste ao clicar no botão "Iniciar"
    tocarAudio('assets/audio/test_tone.mp3');

    const savedDataAlvo = localStorage.getItem('dataAlvo');
    if (!savedDataAlvo) {
        alert('Por favor, salve uma data/hora alvo antes de iniciar.');
        return;
    }

    const dataAlvo = Number(savedDataAlvo);
    iniciarContagemRegressiva(dataAlvo);
});

// Evento para salvar a data/hora alvo no localStorage ao clicar no botão "Salvar"
document.getElementById('saveButton').addEventListener('click', () => {
    const targetDateTimeInput = document.getElementById('targetDateTime').value;
    if (!targetDateTimeInput) {
        alert('Por favor, defina uma data/hora alvo.');
        return;
    }

    const dataAlvo = new Date(targetDateTimeInput).getTime();
    if (isNaN(dataAlvo)) {
        alert('Data/hora inválida. Por favor, tente novamente.');
        return;
    }

    localStorage.setItem('dataAlvo', dataAlvo); // Salva a data/hora alvo no localStorage
    alert('Data/hora alvo salva com sucesso!');
});

// Verifica se há uma data/hora alvo salva no localStorage ao carregar a página
window.addEventListener('load', () => {
    const savedDataAlvo = localStorage.getItem('dataAlvo');
    if (savedDataAlvo) {
        iniciarContagemRegressiva(Number(savedDataAlvo)); // Continua a contagem regressiva
    }
});
