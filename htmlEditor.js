const weatherRootRef = document.getElementById("weatherRoot");
const weatherHeaderRef = document.getElementById("weatherHeader");
const spinnerRef = document.getElementById("spinner_box");
const inputRef = document.getElementById("locationInput");
const weatherbarwrapRef = document.getElementById("weatherbarwrap");
const weatherbarRef = document.getElementById("weatherbar");
const closeSearchBoxRef = document.getElementById("closeSearchBox");
const boxOneARef = document.getElementById("weather_inner_cell1a");

export function HTMLEditor(result) {
  weatherRootRef.style.display = "";
  weatherRootRef.style.fontSize = "";
  weatherRootRef.style.justifyContent = "";
  weatherbarwrapRef.style.backgroundColor = "#149edc";
  inputRef.style.backgroundColor = "#ffffff";
  weatherbarRef.style.color = "#ffffff";
  closeSearchBoxRef.innerHTML = ``;
  weatherRootRef.innerHTML = "";
  spinnerRef.innerHTML = "";
  const { list } = result.data;
  const { name, country } = result.data.city;
  console.log(list);
  weatherRootRef.style.display = "grid";
  weatherHeaderRef.innerHTML = `Today`;

  // Better solution from Jon
  const midday = list.filter((item) => {
    return item.dt_txt.includes("12:00:00");
  });
  console.log("Midday", midday);

  const threeAM = list.filter((item) => {
    return item.dt_txt.includes("03:00:00");
  });
  console.log("3am", threeAM);

  let array = [0];

  for (let i = 0; i < list.length; i += 8) {
    //Playing with time for midnight
    const fiveDayDateTimeStamp = list[i].dt; // UTC Timestamp in seconds
    const fiveDayDateWords = new Date(fiveDayDateTimeStamp * 1000); //Date in words
    const startingHour = fiveDayDateWords.getHours(); //Get hour
    const startingDay = fiveDayDateWords.getDay(); //Get day
    const startingDayWord = ["Sun", "Mon", "Tues", "Wed", "Thus", "Fri", "Sat"];
    const timeToThreeAM =
      startingHour < 3 ? 1 : startingHour == 3 ? 0 : (27 - startingHour) / 3; //position shift required to get to 3am on next day
    const fiveDayTempNight = list[i + timeToThreeAM].main.temp;
    const timeToMidday =
      startingHour < 15 ? (12 - startingHour) / 3 : (36 - startingHour) / 3; //Playing with time for midday

    const fiveDayTemp = list[i + timeToMidday].main.temp;
    array.push(fiveDayTemp);
    console.log(array);
    const fiveDayWeatherDescript =
      list[i + timeToMidday].weather[0].description;
    const fiveDayWeatherIcon = list[i + timeToMidday].weather[0].icon;
    const fiveDayTempNow = list[0].main.temp;
    const fiveDayWeatherDescriptNow = list[0].weather[0].description;
    const fiveDayWeatherIconNow = list[0].weather[0].icon;

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
    <div class="weather_inner_cell1a" id="weather_inner_cell1a">${name}, ${country}</div> 
    <div class="weather_inner_cell1b">${startingDayWord[startingDay]} </div>
    <div class="weather_inner_cell2a" ><img src=https://openweathermap.org/img/wn/${fiveDayWeatherIconNow}.png /></div>
    <div class="weather_inner_cell2b" ><img src=https://openweathermap.org/img/wn/${fiveDayWeatherIcon}.png /></div>
    <div class="weather_inner_cell3a">${Math.round(
      fiveDayTempNow - 273.15
    )}&deg;C</div>
    <div class="weather_inner_cell3b">${Math.round(
      array[i / 8] - 273.15
    )}&deg;C</div>
    <div class="weather_inner_cell4">${Math.round(
      fiveDayTempNight - 273.15
    )}&deg;C</div>
    <div class="weather_inner_cell5a">The weather is ${fiveDayWeatherDescriptNow} </div><div class="weather_inner_cell5b">The weather is ${fiveDayWeatherDescript} </div>
    </div>
  </div>`;
  }
}
