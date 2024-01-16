import { HTMLEditor } from "./htmlEditor.js";

const locationSearchRef = document.getElementById("locationSearch");
const weatherRootRef = document.getElementById("weatherRoot");
const cityListContainer = document.querySelector("[data-suggestion]");
const searchListRef = document.getElementById("searchList");
const inputRef = document.getElementById("locationInput");
const spinnerRef = document.getElementById("spinner_box");
const weatherHeaderRef = document.getElementById("weatherHeader");

const spinner = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

inputRef.addEventListener("click", () => {
  inputRef.setAttribute("value", "");
});

locationSearchRef.addEventListener("click", function searchBox(e) {
  e.preventDefault();
  let typedLocation = document.getElementById("locationInput").value;
  if (typedLocation.length < 2) {
    weatherRootRef.innerHTML = `Please enter at least 2 characters`;
  } else {
    weatherRootRef.innerHTML = "";
    weatherHeaderRef.innerHTML = "";
    getWeatherData(typedLocation);
  }
});

async function getWeatherData(typedLocation) {
  spinnerRef.innerHTML = spinner;

  try {
    const searchLocation = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${typedLocation}&limit=5&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );
    console.log(searchLocation);

    await handleCityList(searchLocation);

    const { lat, lon } = searchLocation.data[0];
    console.log(lat, lon);
  } catch (err) {
    weatherRootRef.innerHTML = `API Down, try again later`;
  }
}

const handleCityList = (input) => {
  cityListContainer.style.display = "block";
  const object = input.data.map((loc) => {
    const { lat, lon, name, state = "", country = "" } = loc;

    return `<li data-lat="${lat}" data-lon="${lon}">${name}, ${state} (${country})</li>`;
  });
  spinnerRef.innerHTML = "";
  const cityString = object.join("");
  cityListContainer.innerHTML = cityString;
  cityListContainer.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() === "li") {
      const lat = event.target.getAttribute("data-lat");
      const lon = event.target.getAttribute("data-lon");

      latAndLon(lat, lon);

      cityListContainer.style.display = "none";
    }
  });
};

async function latAndLon(lat, lon) {
  console.log(lat, lon);
  spinnerRef.innerHTML = spinner;
  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );

    console.log(result, "this");

    await HTMLEditor(result);
  } catch (err) {
    weatherRootRef.innerHTML = `API Down, try again later`;
  }
}
