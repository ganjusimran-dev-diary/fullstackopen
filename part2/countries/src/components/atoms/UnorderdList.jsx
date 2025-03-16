import { Heading } from "./index";

const UnorderdList = ({ label = '', items = [] }) => {
    return (
        <>
            <Heading title={label} type="secondary" />
            {
                !!items?.length ? (
                    <ul>
                        {
                            items?.map((item) => <li key={item}>{item}</li>)
                        }
                    </ul>
                ) : <p>No data found!</p>
            }
        </>
    );
}

export default UnorderdList;
