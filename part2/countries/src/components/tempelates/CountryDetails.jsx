import { useMemo } from "react";
import { GeneralDetail } from "../organisms/index";

const CountryDetails = ({
    name = '',
    capital = '',
    area = 0,
    languages = [],
    flags = { uri: '', alt: '' }
}) => {
    return (
        <>
            <GeneralDetail
                name={name}
                capital={capital}
                area={area}
                languages={languages}
                flags={flags}
            />
        </>
    );
}

export default CountryDetails;
