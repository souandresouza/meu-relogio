// Função para buscar dados climáticos
function fetchWeather(query) {
    const apiKey = 'e7314838ebd86431d951d53c59e7fd20';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada. Verifique o nome ou tente novamente.');
            }
            return response.json();
        })
        .then(data => {
            // Atualizar os elementos da página com os dados recebidos
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('location').textContent = data.name;
            document.getElementById('feels-like').textContent = `Sensação: ${Math.round(data.main.feels_like)}°C`;
            document.getElementById('humidity').textContent = `Umidade: ${data.main.humidity}%`;
            document.getElementById('wind').textContent = `Vento: ${Math.round(data.wind.speed)} km/h (${getCardinalDirection(data.wind.deg)})`;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            // Salvar o último local pesquisado no localStorage
            localStorage.setItem('lastLocation', query);
        })
        .catch(error => {
            console.error('Erro ao buscar dados climáticos:', error);
            alert(error.message || 'Não foi possível obter os dados climáticos. Verifique sua conexão ou tente novamente.');
        });
}

// Evento de clique no botão "Buscar"
document.getElementById('searchButton').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value.trim(); // Remove espaços extras
    if (!query) {
        alert('Por favor, insira um CEP ou nome de cidade.');
        return;
    }
    fetchWeather(query);
});

// Verificar se há um último local salvo no localStorage ao carregar a página
window.addEventListener('load', function () {
    const lastLocation = localStorage.getItem('lastLocation');
    if (lastLocation) {
        document.getElementById('searchInput').value = lastLocation; // Preencher o campo de pesquisa
        fetchWeather(lastLocation); // Buscar os dados climáticos automaticamente
    } else {
        // Caso não haja local salvo, exibir mensagem padrão
        document.getElementById('temperature').textContent = '--°C';
        document.getElementById('description').textContent = 'Carregando...';
        document.getElementById('location').textContent = 'Localização';
        document.getElementById('feels-like').textContent = 'Sensação: --°C';
        document.getElementById('humidity').textContent = 'Umidade: --%';
        document.getElementById('wind').textContent = 'Vento: -- km/h (--)';
        document.getElementById('weather-icon').src = '';
    }
});

function getCardinalDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function updateWeatherInfo(weatherData) {
    const temperature = Math.round(weatherData.main.temp);
    const description = weatherData.weather[0].description;
    const location = weatherData.name;
    const feelsLike = Math.round(weatherData.main.feels_like);
    const humidity = weatherData.main.humidity;
    const windSpeed = Math.round(weatherData.wind.speed);
    const windDegrees = weatherData.wind.deg;
    const windDirection = getCardinalDirection(windDegrees);
    document.getElementById('wind').textContent = `Vento: ${windSpeed} km/h (${windDirection})`;
}