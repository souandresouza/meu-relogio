// Chave da API
const API_KEY = "e7314838ebd86431d951d53c59e7fd20";

// Função para salvar a última cidade pesquisada no localStorage
function saveLastCity(city) {
    localStorage.setItem('lastCity', city);
}

// Função para recuperar a última cidade pesquisada do localStorage
function getLastCity() {
    return localStorage.getItem('lastCity');
}

// Função para buscar os dados climáticos
function fetchWeather(query) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}&lang=pt_br`;

    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error("Cidade não encontrada.");
            return response.json();
        })
        .then((data) => {
            displayWeather(data);
            saveLastCity(query); // Salvar a cidade pesquisada
        })
        .catch((error) => {
            console.error("Erro ao buscar dados climáticos:", error.message);
            document.getElementById('description').textContent = "Cidade não encontrada.";
        });
}

// Função para exibir os dados climáticos
function displayWeather(data) {
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const description = data.weather[0].description;
    const location = `${data.name}, ${data.sys.country}`;
    const humidity = data.main.humidity;
    const windSpeed = Math.round(data.wind.speed);
    const windDirection = getWindDirection(data.wind.deg);

    // Atualizar o DOM
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('feels-like').textContent = `Sensação: ${feelsLike}°C`;
    document.getElementById('description').textContent = capitalize(description);
    document.getElementById('location').textContent = location;
    document.getElementById('humidity').textContent = `Umidade: ${humidity}%`;
    document.getElementById('wind').textContent = `Vento: ${windSpeed} km/h (${windDirection})`;

    // Atualizar o ícone do clima
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Função para capitalizar a primeira letra da descrição
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Função para determinar a direção do vento
function getWindDirection(degrees) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45) % 8;
    return directions[index];
}

// Função para iniciar a busca do clima
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) fetchWeather(query);
});

// Verificar se há uma última cidade salva no localStorage
const lastCity = getLastCity();
if (lastCity) {
    fetchWeather(lastCity);
} else {
    document.getElementById('description').textContent = "Pesquise uma cidade ou CEP.";
}

// Função para alternar o menu dropdown
document.querySelector('.hamburger-icon').addEventListener('click', () => {
    const menu = document.querySelector('.menu-hamburger');
    menu.classList.toggle('active');
});