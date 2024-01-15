function name(first, last) {
  console.log("My fulll name is", first, "", last);
}

name("Matt", "Holmes");

const name2 = (first, last) => {
  console.log("My fulll name is", first, "", last);
};

name2("Kieran", "Croft");

// Backup

import { HTMLEditor } from "./htmlEditor.js";

const locationSearchRef = document.getElementById("locationSearch");
const weatherRootRef = document.getElementById("weatherRoot");
const suggestionContainer = document.querySelector("[data-suggestion]");

const spinner = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

locationSearchRef.addEventListener("click", function searchBox(e) {
  e.preventDefault();
  let typedLocation = document.getElementById("locationInput").value;
  getWeatherData(typedLocation);
});

export async function getWeatherData(typedLocation) {
  weatherRootRef.innerHTML = spinner;

  try {
    const searchLocation = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${typedLocation}&limit=5&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );
    console.log(searchLocation);

    await handleCityList(searchLocation);

    const { lat, lon } = searchLocation.data[0];
    console.log(lat, lon);
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );

    console.log(result);

    await HTMLEditor(result);
  } catch (err) {
    weatherRootRef.innerHTML = `API Down, try again later`;
  }
}

const handleCityList = (input) => {
  suggestionContainer.style.display = "block";
  const object = input.data.map((loc) => {
    const { lat, lon, name, state = "", country = "" } = loc;
    // return li tag containg the lat and long data
    return `<li data-lat="${lat}" data-lon="${lon}">${name}, ${state} (${country})</li>`;
  });
  const cityString = object.join("");
  console.log(cityString);
  suggestionContainer.innerHTML = cityString;
  // listen for user clicking in any of the suggestions (li)
  suggestionContainer.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() === "li") {
      //     // extract the lat and long data
      const lat = event.target.getAttribute("data-lat");
      const lon = event.target.getAttribute("data-lon");
      console.log(lat, lon);
      //     // add the clicked suggestion to the input field
      //     // cityInput.value = event.target.innerHTML; Need to add own input box
      //     // clear the suggestions
      //     // suggestionContainer.innerHTML = "";
      suggestionContainer.style.display = "none";
      //     // call getWeather function
      //     // getWeather(lat, lon); Add my own
    }
  });
};
