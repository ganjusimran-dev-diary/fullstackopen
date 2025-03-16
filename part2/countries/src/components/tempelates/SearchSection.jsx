import { Search, UnorderedListWithAction } from "../molecules/index"


const SearchSection = ({
    onSearchCountry = () => { },
    searchError = '',
    seachMatchList = [],
    onSelectCountry
}) => {
    return (
        <>
            <Search
                label='find  countries'
                placeholder='Search for county(s)'
                onSearch={onSearchCountry}
            />
            {
                !!searchError?.length > 0 && (
                    <p>{searchError}</p>
                )
            }
            {
                seachMatchList?.length > 0 && (
                    <UnorderedListWithAction
                        items={seachMatchList}
                        action="Show"
                        onAction={onSelectCountry} />
                )
            }
        </>
    )
}

export default SearchSection;
