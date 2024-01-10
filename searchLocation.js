import { HTMLEditor } from "./htmlEditor.js";

const locationSearchRef = document.getElementById("locationSearch");
const weatherRootRef = document.getElementById("weatherRoot");
const locationListRef = document.getElementById("locationList");

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
    const { data } = searchLocation;
    cityString(data);

    // cityList(searchLocation); trying to pull from Array but think its object

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

// function cityList(searchLocation) {
//   for (let i = 0; i < 6; i++) {
//     console.log(
//       searchLocation.data[i].name,
//       searchLocation.data[i].state,
//       searchLocation.data[i].country
//     );
//   }
// }

function cityString(data) {
  locationListRef.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let locSearch = JSON.stringify(
      data[i].name + ", " + data[i].state + ", " + data[i].country
    );
    console.log(locSearch);

    locationListRef.innerHTML += `<div><button class="locationDetailed">${locSearch}</button></div>`;
  }
  // const locationListDetailRef =
  //   document.getElementsByClassName("locationDetailed");

  // locationListDetailRef.addEventListener("click", function finalSearch(e) {
  //   e.preventDefault();
  //   console.log("Success");
  // });
}
