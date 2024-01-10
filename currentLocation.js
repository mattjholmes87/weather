import { getLocation } from "./location.js";
import { HTMLEditor } from "./htmlEditor.js";

const currentLocationRef = document.getElementById("currentLocation");
const weatherRootRef = document.getElementById("weatherRoot");

const spinner = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

currentLocationRef.addEventListener("click", function locationBox(e) {
  e.preventDefault();
  getWeatherDataCurrentLoc();
  clearFields();
});

export async function getWeatherDataCurrentLoc() {
  weatherRootRef.innerHTML = spinner;

  try {
    const data = await getLocation();

    const { latitude, longitude } = data.coords;

    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );

    console.log(result);
    await HTMLEditor(result);
  } catch (err) {
    weatherRootRef.innerHTML = `API Down, try again later`;
  }
}

// getWeatherDataCurrentLoc();

let clearFields = () => (document.getElementById("locationInput").value = "");
