import axios from 'axios';
const BASE_COUNTRY_URL = 'https://studies.cs.helsinki.fi/restcountries/api';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5';

export const getAllCountriesData = async () => {
    return await axios.get(`${BASE_COUNTRY_URL}/all`).then((res) => res?.data).catch((err) => ({ error: err?.message }));
}

export const fetchWeatherDetail = async (city) => {
    const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
    const url = `${BASE_WEATHER_URL}/find?q=${city}&appid=${API_KEY}&units=metric`;
    return await axios.get(url).then((res) => res?.data).catch((err) => ({}));
};