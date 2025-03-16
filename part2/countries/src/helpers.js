import axios from 'axios';
const BASE_PHONE_BOOK_URL = 'https://studies.cs.helsinki.fi/restcountries/api';

export const getAllCountriesData = async () => {
    return await axios.get(`${BASE_PHONE_BOOK_URL}/all`).then((res) => res?.data).catch((err) => ({ error: err?.message }));
}

