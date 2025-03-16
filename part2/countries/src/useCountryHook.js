import { useState } from "react"
import { useEffect } from "react"
import { fetchWeatherDetail, getAllCountriesData } from "./helpers";
import { debounce } from "./utils";

const useCountryHook = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCountryDetail, setSelectedCountryDetail] = useState({});
    const [selectedCountryWeatherDetail, setSelectedCountryWeatherDetail] = useState({});
    const [allCountriesDetailsData, setAllCountriesDetailsData] = useState({});
    const [allCountriesList, setAllCountriesList] = useState([]);
    const [seachMatchList, setSearchMatchList] = useState([]);
    const [searchError, setSearchError] = useState('');


    const onSelectViewCountryDetail = (countryName, text = '') => {
        if (!countryName) {
            setSelectedCountryDetail({});
            setSelectedCountryWeatherDetail({});
        }
        const country = allCountriesDetailsData[countryName];
        setSelectedCountryDetail({
            searchText: text,
            name: country?.name?.common,
            capital: country?.capital?.join(', ') || [],
            area: country?.area,
            languages: country?.languages ? Object.values(country?.languages) : [],
            flags: {
                uri: country?.flags?.png || country?.flags?.svg || '',
                alt: country?.flags?.alt || `${country?.name?.common || "Country's"} flag`
            }
        });
        const selectedCapital = country?.capital?.[0];
        if (selectedCapital) {
            if (!!country?.weather?.name?.length) {
                setSelectedCountryWeatherDetail(country?.weather)
            } else {
                setLoading(true);
                fetchWeatherDetail(selectedCapital).then((response) => {
                    fetchCapitalWeatherDetail(response?.list?.[0] || {}, countryName);
                }).catch((err) => { }).finally(() => { setLoading(false) })
            }
        } else {
            setSelectedCountryWeatherDetail({});
        }
    }

    const fetchCapitalWeatherDetail = (detail = {}, countryName = '') => {
        if (!detail?.name) {
            setSelectedCountryWeatherDetail({});
            return;
        }
        const iconPath = detail?.weather?.[0]?.icon || '';
        const weather = {
            name: detail.name,
            icon: {
                uri: iconPath ? `https://openweathermap.org/img/wn/${iconPath}@2x.png` : '',
                alt: detail?.weather?.[0]?.description || 'Weather Icon'
            },
            wind: detail?.wind?.speed?.toFixed(2),
            temperature: `${Math.round(detail?.main?.temp)}`
        }
        setSelectedCountryWeatherDetail(weather);
        setAllCountriesDetailsData((prev) => {
            return {
                ...prev,
                [countryName]: {
                    ...prev[countryName],
                    weather
                }
            }
        })
    }

    useEffect(() => {
        setLoading(true);
        getAllCountriesData().then((response) => {
            if (!response?.error) {
                const newCountryDetailMap = {};
                const newCountryMap = [];
                for (let item of response) {
                    newCountryDetailMap[item?.name?.common] = item;
                    newCountryMap.push(item?.name?.common);
                }
                setAllCountriesDetailsData(newCountryDetailMap);
                setAllCountriesList(newCountryMap);
            }
        }).catch(() => { }).finally(() => {
            setLoading(false);
        });
    }, []);

    const onSearchCountry = (text) => {
        if (!!selectedCountryDetail?.searchText?.length &&
            selectedCountryDetail?.searchText?.length <= text?.length &&
            selectedCountryDetail?.name?.toLowerCase()?.includes(text)) {
            return;
        }
        setSearchError('');
        onSelectViewCountryDetail('');
        setSearchMatchList([])
        if (text?.trim()?.length > 0) {
            let searchedCountries = [];
            for (let country of allCountriesList) {
                if (country?.toLowerCase()?.includes(text)) {
                    searchedCountries.push(country);
                }
                if (searchedCountries?.length > 10) {
                    setSearchError('Too many matches specify another filter');
                    break;
                }
            }
            if (searchedCountries?.length == 1) {
                onSelectViewCountryDetail(searchedCountries[0], text);
                searchedCountries = []
            } else if (searchedCountries?.length > 10) {
                searchedCountries = []
            }
            setSearchMatchList(searchedCountries);
        }

    }

    const searchDebounced = debounce((text) => onSearchCountry(text?.toLowerCase()), 300);

    return {
        loading,
        searchError,
        seachMatchList,
        searchDebounced,
        selectedCountryDetail,
        allCountriesDetailsData,
        onSelectViewCountryDetail,
        selectedCountryWeatherDetail
    }
};

export default useCountryHook;