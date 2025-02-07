document.getElementById('searchButton').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value;
    if (!query) {
        alert('Por favor, insira um CEP ou nome de cidade.');
        return;
    }

    // URL da API com sua chave
    const apiKey = 'e7314838ebd86431d951d53c59e7fd20';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric&lang=pt_br`;

    // Chamada à API
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
            document.getElementById('wind').textContent = `Vento: ${Math.round(data.wind.speed)} km/h (${data.wind.deg}°)`;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
        .catch(error => {
            console.error('Erro ao buscar dados climáticos:', error);
            alert(error.message || 'Não foi possível obter os dados climáticos. Verifique sua conexão ou tente novamente.');
        });
});
