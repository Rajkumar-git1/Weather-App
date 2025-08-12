// Replace with your OpenWeatherMap API key
const apiKey = "YOUR_API_KEY";

document.getElementById("searchBtn").addEventListener("click", () => {
    let city = document.getElementById("locationInput").value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

async function getWeather(city) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        // Update UI with weather data
        document.getElementById("city").innerText = data.name + ", " + data.sys.country;
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("temperature").innerText = Math.round(data.main.temp) + " °C";
        document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
        document.getElementById("wind").innerText = "Wind: " + data.wind.speed + " km/h";
    } catch (error) {
        alert("Error fetching weather data");
        console.error(error);
    }
}
