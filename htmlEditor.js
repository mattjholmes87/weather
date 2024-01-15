const weatherRootRef = document.getElementById("weatherRoot");

export function HTMLEditor(result) {
  weatherRootRef.innerHTML = "";
  const { list } = result.data;
  const { name, country } = result.data.city;
  console.log(list);
  weatherRootRef.innerHTML += `Your five day forecast for ${name}, ${country} :`;
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
    weatherRootRef.innerHTML += `<div>Day ${day}: 
    <div>The temperature is ${Math.round(fiveDayTemp - 273.15)}&deg;C </div>
    <div><img src=https://openweathermap.org/img/wn/${fiveDayWeatherIcon}.png /></div> 
    <div>The weather is ${fiveDayWeatherDescript} </div>
    </div>`;
  }
}
