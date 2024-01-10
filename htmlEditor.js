const weatherRootRef = document.getElementById("weatherRoot");

export function HTMLEditor(result) {
  const { temp } = result.data.main;
  const { name } = result.data;
  document.getElementById("locationInput").value = name;
  weatherRootRef.innerHTML = `The temperature in ${
    result.data.name
  } is ${Math.round(temp - 273.15)}&deg;C `;
}
