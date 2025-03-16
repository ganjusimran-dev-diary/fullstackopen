import { CountryDetails, SearchSection } from './components/tempelates';
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
  } = useCountryHook();

  return (
    <div>
      {
        !loading && !Object.keys(allCountriesDetailsData)?.length ?
          <p>Something went wrong while setting up. Please try again later</p> :
          <>
            {
              !loading && (
                <SearchSection
                  onSearchCountry={searchDebounced}
                  searchError={searchError}
                  seachMatchList={seachMatchList}
                  onSelectCountry={onSelectViewCountryDetail}
                />
              )
            }
            {
              selectedCountryDetail?.name ? (
                <CountryDetails
                  name={selectedCountryDetail?.name}
                  capital={selectedCountryDetail?.capital}
                  area={selectedCountryDetail?.area}
                  languages={selectedCountryDetail?.languages}
                  flags={selectedCountryDetail?.flags}
                />
              ) : null
            }
          </>
      }
      {!!loading && <p>Loading...</p>}

    </div>
  )
}

export default App
