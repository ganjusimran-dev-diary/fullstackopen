import { Heading } from "../atoms/index";

const WeatherDetails = ({
    name = '',
    temperature = '',
    icon = { uri: '', alt: '' },
    wind = ''
}) => {
    return (
        <>
            <Heading title={`Weather in ${name}`} type="secondary" />
            {
                !!temperature ? (
                    <p>Temperature: {temperature} Celsius</p>
                ) : null
            }
            {
                icon?.uri ? (
                    <img src={icon.uri} alt={icon?.alt || 'Weather Icon'} />
                ) : null
            }
            {
                !!wind ? (
                    <p>Wind: {wind}m/s</p>
                ) : null
            }
        </>
    )
}

export default WeatherDetails;
