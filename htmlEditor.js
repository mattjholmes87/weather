const weatherRootRef = document.getElementById("weatherRoot");
const weatherHeaderRef = document.getElementById("weatherHeader");
const spinnerRef = document.getElementById("spinner_box");

export function HTMLEditor(result) {
  spinnerRef.innerHTML = "";
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
    const tempDescrip =
      Math.round(fiveDayTemp - 273.15) < -20
        ? "below-20"
        : Math.round(fiveDayTemp - 273.15) < -15
        ? "below-15"
        : Math.round(fiveDayTemp - 273.15) < -10
        ? "below-10"
        : Math.round(fiveDayTemp - 273.15) < -5
        ? "below-05"
        : Math.round(fiveDayTemp - 273.15) < -3
        ? "below-03"
        : Math.round(fiveDayTemp - 273.15) < -2
        ? "below-02"
        : Math.round(fiveDayTemp - 273.15) < -1
        ? "below-01"
        : Math.round(fiveDayTemp - 273.15) < 0
        ? "below0"
        : Math.round(fiveDayTemp - 273.15) < 1
        ? "below01"
        : Math.round(fiveDayTemp - 273.15) < 2
        ? "below02"
        : Math.round(fiveDayTemp - 273.15) < 3
        ? "below03"
        : Math.round(fiveDayTemp - 273.15) < 5
        ? "below05"
        : Math.round(fiveDayTemp - 273.15) < 8
        ? "below08"
        : Math.round(fiveDayTemp - 273.15) < 11
        ? "below11"
        : Math.round(fiveDayTemp - 273.15) < 15
        ? "below15"
        : Math.round(fiveDayTemp - 273.15) < 18
        ? "below18"
        : Math.round(fiveDayTemp - 273.15) < 21
        ? "below21"
        : Math.round(fiveDayTemp - 273.15) < 25
        ? "below25"
        : Math.round(fiveDayTemp - 273.15) < 30
        ? "below30"
        : Math.round(fiveDayTemp - 273.15) < 35
        ? "below35"
        : Math.round(fiveDayTemp - 273.15) < 40
        ? "below40"
        : "above40";
    document.getElementById("locationInput").value = name;
    weatherRootRef.innerHTML += ` <div class="weather_cell${day} ${tempDescrip}">
    <div class="weather_inner_cell1">${name}, ${country} </div>
    <div class="weather_inner_cell2" ><img src=https://openweathermap.org/img/wn/${fiveDayWeatherIcon}.png /></div>
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
