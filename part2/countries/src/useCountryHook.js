import { useState } from "react"
import { useEffect } from "react"
import { getAllCountriesData } from "./helpers";
import { debounce } from "./utils";

const useCountryHook = () => {
    const [loading, setLoading] = useState(false);
    const [selectedCountryDetail, setSelectedCountryDetail] = useState({});
    const [allCountriesDetailsData, setAllCountriesDetailsData] = useState({});
    const [allCountriesList, setAllCountriesList] = useState([]);
    const [seachMatchList, setSearchMatchList] = useState([]);
    const [searchError, setSearchError] = useState('');

    const onSelectViewCountryDetail = (countryName, text = '') => {
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
    }

    useEffect(() => {
        setLoading(true)
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
        })
    }, []);

    const onSearchCountry = (text) => {
        if (!!selectedCountryDetail?.searchText?.length &&
            selectedCountryDetail?.searchText?.length <= text?.length &&
            selectedCountryDetail?.name?.toLowerCase()?.includes(text)) {
            return;
        }
        setSearchError('');
        onSelectViewCountryDetail({});
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
    }
};

export default useCountryHook;