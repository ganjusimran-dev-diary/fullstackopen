import { CountryDetails, SearchSection, WeatherDetails } from './components/tempelates';
import useCountryHook from './useCountryHook';

const App = () => {
  const {
    loading,
    searchError,
    seachMatchList,
    searchDebounced,
    selectedCountryDetail,
    allCountriesDetailsData,
    onSelectViewCountryDetail,
    selectedCountryWeatherDetail,
  } = useCountryHook();

  return (
    <div>
      {
        !loading && !Object.keys(allCountriesDetailsData)?.length ?
          <p>Something went wrong while setting up. Please try again later</p> :
          <>
            <SearchSection
              onSearchCountry={searchDebounced}
              searchError={searchError}
              seachMatchList={seachMatchList}
              onSelectCountry={onSelectViewCountryDetail}
            />
          </>
      }
      {
        selectedCountryDetail?.name ? (
          <CountryDetails
            name={selectedCountryDetail.name}
            capital={selectedCountryDetail?.capital}
            area={selectedCountryDetail?.area}
            languages={selectedCountryDetail?.languages}
            flags={selectedCountryDetail?.flags}
          />
        ) : null
      }
      {
        selectedCountryWeatherDetail?.name ? (
          <WeatherDetails
            name={selectedCountryWeatherDetail.name}
            temperature={selectedCountryWeatherDetail?.temperature}
            wind={selectedCountryWeatherDetail?.wind}
            icon={selectedCountryWeatherDetail?.icon}
          />
        ) : null
      }
      {!!loading && <p>Loading...</p>}

    </div>
  )
}

export default App
