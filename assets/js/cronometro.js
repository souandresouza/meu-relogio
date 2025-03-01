let timer;
let time = 0;
let isRunning = false;

function playPause() {
    const button = document.getElementById('start-pause');
    if (isRunning) {
        clearInterval(timer);
        button.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            time++;
            updateDisplay();
        }, 1000);
        button.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function stop() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('start-pause').textContent = 'Start';
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    time = 0;
    document.getElementById('start-pause').textContent = 'Start';
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('stopwatch').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
function applyTheme() {
    const hour = new Date().getHours();
    const body = document.body;
    if (hour >= 6 && hour < 18) {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }
}
// Chame a função applyTheme() para aplicar o tema inicial
window.addEventListener('load', applyTheme);
