// assets/js/navbar.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', () => {
            const menu = document.querySelector('.menu-hamburger');
            menu.classList.toggle('active');
        });
    }
});

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
