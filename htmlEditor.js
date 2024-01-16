const weatherRootRef = document.getElementById("weatherRoot");
const weatherHeaderRef = document.getElementById("weatherHeader");

export function HTMLEditor(result) {
  weatherRootRef.innerHTML = "";
  const { list } = result.data;
  const { name, country } = result.data.city;
  console.log(list);
  weatherRootRef.style.display = "grid";
  weatherHeaderRef.innerHTML = `Today`;
  for (let i = 0; i < list.length; i += 8) {
    const fiveDayTemp = list[i].main.temp;
    const fiveDayWeather = list[i].weather[0].main;
    const fiveDayWeatherDescript = list[i].weather[0].description;
    const fiveDayWeatherIcon = list[i].weather[0].icon;
    console.log(fiveDayTemp);
    console.log(fiveDayWeather);
    console.log(fiveDayWeatherDescript);
    console.log(fiveDayWeatherIcon);
    let day = i / 8 + 1;

    document.getElementById("locationInput").value = name;
    weatherRootRef.innerHTML += ` <div class="weather_cell${day}">
    <div class="weather_inner_cell1">${name}, ${country} </div>
    <div class="weather_inner_cell2"><img src=https://openweathermap.org/img/wn/${fiveDayWeatherIcon}.png /></div>
    <div class="weather_inner_cell3">${Math.round(
      fiveDayTemp - 273.15
    )}&deg;C</div>
    <div class="weather_inner_cell4">${Math.round(
      fiveDayTemp - 273.15
    )}&deg;C</div>
    <div class="weather_inner_cell5">The weather is ${fiveDayWeatherDescript} </div>
  </div>`;
  }
}
