// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const updateTime = () => {
        const now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        document.getElementById('time').textContent = timeString;

        const dateString = now.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        document.getElementById('date').textContent = dateString;
    };

    setInterval(updateTime, 1000);
    updateTime(); // Atualiza o relógio imediatamente ao carregar a página
});
