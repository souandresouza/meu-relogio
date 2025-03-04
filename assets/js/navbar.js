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