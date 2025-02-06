// Função para alternar o tema
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Cronômetro
let timer;
let time = 0;

function updateTime() {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    document.getElementById('stopwatch').textContent = `${minutes}:${seconds}`;
}

function playPause() {
    const startPauseButton = document.getElementById('start-pause');
    if (startPauseButton.textContent === 'Start') {
        startPauseButton.textContent = 'Pause';
        timer = setInterval(() => {
            time++;
            updateTime();
        }, 1000);
    } else {
        startPauseButton.textContent = 'Start';
        clearInterval(timer);
    }
}

function stop() {
    clearInterval(timer);
    const startPauseButton = document.getElementById('start-pause');
    startPauseButton.textContent = 'Start';
}

function reset() {
    clearInterval(timer);
    time = 0;
    updateTime();
    const startPauseButton = document.getElementById('start-pause');
    startPauseButton.textContent = 'Start';
}