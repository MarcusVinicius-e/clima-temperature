//  Interação
const citySearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')



// Exibição
const currentDate = document.getElementById('current-date')
const cityName = document.getElementById('city-name')
const weatherIcon = document.getElementById('weather-icon')
const weatherDescription = document.getElementById('weathe-description')
const currentTemperature = document.getElementById('current-temperature')
const windSpeed = document.getElementById('wind-speed')
const feelsLikeTemperature = document.getElementById('feels-like-temperature')
const currentHumidity = document.getElementById('current-humidity')
const sunriseTime = document.getElementById('sunrise-time')
const sunsetTime = document.getElementById('sunset-time')
const api_key = "250aa9b3409c7a6949acc6c0f8da0a1f"

citySearchButton.addEventListener("click", () => {
  let cityName = citySearchInput.value
  getCityWeather(cityName)
})

document.getElementById("city-search-input").addEventListener("keyup", (e) => {
  const cityName = e.target.value
  const key = e.which || e.keyCode
  const isEnterKeyPressed = key === 13

  if (isEnterKeyPressed) {
    getCityWeather(cityName)
  }

  if (cityName.length === 0) {
    alert("Preencha o campo com o nome da cidade")
    return
  }
})
navigator.geolocation.getCurrentPosition(
  (position) => {
    let lat = position.coords.latitude
    let lon = position.coords.longitude

    getCurrentLocationWeather(lat, lon)
  },
  (err) => {
    if (err.code === 1) {
      alert("Geolocalição negada pelo usuário, busque manualmente por uma cidade através da barra de pesquisa.")
    } else {
      console.log(err)
    }
  }
)

function getCurrentLocationWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
}

function getCityWeather(cityName) {

  weatherIcon.src = `./src/image/loading-icon.svg `

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))


}
console.log(displayWeather)

function displayWeather(data) {
  let {
    dt,
    name,
    weather: [{ icon, description }],
    main: { temp, feels_Like, humidity },
    wind: { speed },
    sys: { sunrise, sunset },
  } = data

  currentDate.textContent = formatDate(dt)
  cityName.textContent = name
  weatherIcon.src = ` ./src/image/${icon}.svg `
  weatherDescription.textContent = description
  currentTemperature.textContent = `${Math.round(temp)}°C`;
  windSpeed.textContent = `${Math.round(speed)} km`
  feelsLikeTemperature.textContent = `${Math.round(feels_Like)}°C`;
  currentHumidity.textContent = `${humidity}%`
  sunriseTime.textContent = formatTime(sunrise)
  sunsetTime.textContent = formatTime(sunset)
}

function formatDate(epochTime) {
  let date = new Date(epochTime * 1000)
  let formattedDate = date.toLocaleDateString('pt-BR', { month: "long", day: 'numeric' })
  return `Hoje, ${formattedDate}`
}
function formatTime(epochTime) {
  let date = new Date(epochTime * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  return `${hours}:${minutes}`
}
