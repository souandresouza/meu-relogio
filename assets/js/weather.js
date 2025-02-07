document.getElementById('searchButton').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value;
    if (!query) {
        alert('Por favor, insira um CEP ou nome de cidade.');
        return;
    }

    // Simulação de chamada à API (substitua pela sua API real)
    fetch(`https://api.example.com/weather?q=${query}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('temperature').textContent = `${data.main.temp}°C`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('location').textContent = data.name;
            document.getElementById('feels-like').textContent = `Sensação: ${data.main.feels_like}°C`;
            document.getElementById('humidity').textContent = `Umidade: ${data.main.humidity}%`;
            document.getElementById('wind').textContent = `Vento: ${data.wind.speed} km/h (${data.wind.deg}°)`;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
        .catch(error => {
            console.error('Erro ao buscar dados climáticos:', error);
            alert('Não foi possível obter os dados climáticos. Verifique sua conexão ou tente novamente.');
        });
});
