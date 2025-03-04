let stopwatchInterval;
let elapsedTime = parseInt(localStorage.getItem('elapsedTime')) || 0; // Restore elapsed time
let isRunning = localStorage.getItem('isRunning') === 'true'; // Restore running state

function updateStopwatchDisplay() {
    const stopwatchElement = document.getElementById('stopwatch');
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    stopwatchElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playPause() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        isRunning = false;
        document.getElementById('start-pause').textContent = 'Start';
    } else {
        stopwatchInterval = setInterval(() => {
            elapsedTime++;
            updateStopwatchDisplay();
            localStorage.setItem('elapsedTime', elapsedTime); // Save elapsed time
        }, 1000);
        isRunning = true;
        document.getElementById('start-pause').textContent = 'Pause';
    }
    localStorage.setItem('isRunning', isRunning); // Save running state
}

function stop() {
    clearInterval(stopwatchInterval);
    isRunning = false;
    elapsedTime = 0;
    updateStopwatchDisplay();
    document.getElementById('start-pause').textContent = 'Start';
    localStorage.setItem('elapsedTime', elapsedTime); // Reset elapsed time
    localStorage.setItem('isRunning', isRunning); // Reset running state
}

function reset() {
    clearInterval(stopwatchInterval);
    isRunning = false;
    elapsedTime = 0;
    updateStopwatchDisplay();
    document.getElementById('start-pause').textContent = 'Start';
    localStorage.setItem('elapsedTime', elapsedTime); // Reset elapsed time
    localStorage.setItem('isRunning', isRunning); // Reset running state
}

// Restore display on page load
document.addEventListener('DOMContentLoaded', updateStopwatchDisplay);