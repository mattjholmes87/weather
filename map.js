const map_box_mobileRef = document.getElementById("map_box_mobile");
const LerwickRef = document.getElementsByClassName("cityIcon_Lerwick");
const InvernessRef = document.getElementById("cityIcon_Inverness");
const EdinburghRef = document.getElementById("cityIcon_Edinburgh");
const BelfastRef = document.getElementById("cityIcon_Belfast");
const HullRef = document.getElementById("cityIcon_Hull");
const ManchesterRef = document.getElementById("cityIcon_Manchester");
const CardiffRef = document.getElementById("cityIcon_Cardiff");
const LondonRef = document.getElementById("cityIcon_London");
const StHelierRef = document.getElementById("cityIcon_StHelier");

async function mapWeather() {
  try {
    const Lerwick = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=60.15&lon=1.14&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );
    const Inverness = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=57.47&lon=4.22&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );
    const Edinburgh = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=55.95&lon=3.18&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );
    const Belfast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=54.59&lon=5.93&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );
    const Hull = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=53.76&lon=0.32&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );
    const Manchester = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=53.48&lon=2.24&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );
    const Cardiff = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=51.48&lon=2.24&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );
    const London = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=51.50&lon=0.12&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );
    const StHelier = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=49.18&lon=2.10&appid=20b2728d9aba59c5f9efb3c40597cd8c`
    );

    await mapEditor(
      Lerwick,
      Inverness,
      Edinburgh,
      Belfast,
      Hull,
      Manchester,
      Cardiff,
      London,
      StHelier
    );
  } catch (err) {
    map_box_mobileRef.innerHTML = `Map is currently unavailable due to satalite interference`;
  }
}

function mapEditor(
  result1,
  result2,
  result3,
  result4,
  result5,
  result6,
  result7,
  result8,
  result9
) {
  console.log(result1.data.list[0].weather[0].icon);
  const Lerwick = result1.data.list[0].weather[0].icon;
  const Inverness = result2.data.list[0].weather[0].icon;
  const Edinburgh = result3.data.list[0].weather[0].icon;
  const Belfast = result4.data.list[0].weather[0].icon;
  const Hull = result5.data.list[0].weather[0].icon;
  const Manchester = result6.data.list[0].weather[0].icon;
  const Cardiff = result7.data.list[0].weather[0].icon;
  const London = result8.data.list[0].weather[0].icon;
  const StHelier = result9.data.list[0].weather[0].icon;

  LerwickRef.innerHTML += `<img src=https://openweathermap.org/img/wn/${Lerwick}.png />`;
  InvernessRef.innerHTML += `<img src=https://openweathermap.org/img/wn/${Inverness}.png />`;
  EdinburghRef.innerHTML += `<img src=https://openweathermap.org/img/wn/${Edinburgh}.png />`;
  BelfastRef.innerHTML += `<img src=https://openweathermap.org/img/wn/${Belfast}.png />`;
  HullRef.innerHTML += `<img src=https://openweathermap.org/img/wn/${Hull}.png />`;
  ManchesterRef.innerHTML += `<img src=https://openweathermap.org/img/wn/${Manchester}.png />`;
  CardiffRef.innerHTML += `<img src=https://openweathermap.org/img/wn/${Cardiff}.png />`;
  LondonRef.innerHTML += `<img src=https://openweathermap.org/img/wn/${London}.png />`;
  StHelierRef.innerHTML += `<img src=https://openweathermap.org/img/wn/${StHelier}.png />`;
}

mapWeather();
