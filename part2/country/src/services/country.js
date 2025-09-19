import axios from "axios";
const url = "https://studies.cs.helsinki.fi/restcountries/api";
const api_key = import.meta.env.VITE_SOME_KEY;
const weather_url = "https://api.openweathermap.org/data/2.5/weather";
const apiforbrowser =
  "https://api.openweathermap.org/data/2.5/weather?q=London&appid=32b29903a827acae7d75c4c9b3b9edc5&units=metric";

const getAllCountry = () => {
  const request = axios.get(`${url}/all`);
  return request.then((response) => response.data);
};

const getCountryInfo = (countryName) => {
  const request = axios.get(`${url}/name/${countryName}`);
  return request.then((response) => response.data);
};
const getCountryWeather = (city) => {
  const request = axios.get(
    weather_url,

    {
      params: {
        q: city,
        appid: api_key,
        units: "metric",
      },
    }
  );

  return request.then((res) => res.data);
};
export default { getAllCountry, getCountryInfo, getCountryWeather };
