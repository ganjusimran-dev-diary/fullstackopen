import { Heading, UnorderdList } from "../atoms/index";

const GeneralDetail = ({
    name = '',
    capital = '',
    area = 0,
    languages = [],
    flags = { uri: '', alt: '' }
}) => {
    return (
        <>
            <Heading title={name} />
            {
                capital?.length > 0 && (
                    <p>Capiltal {capital}</p>
                )
            }
            {
                area > 0 && (
                    <p>Area: {area}</p>
                )
            }
            <UnorderdList label="Languages" items={languages} />
            {
                !!flags?.uri?.length && (
                    <p>
                        <img src={flags?.uri} alt={flags?.alt} />
                    </p>
                )
            }
        </>
    )
}

export default GeneralDetail;
