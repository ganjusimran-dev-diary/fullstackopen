import { Button } from "../atoms";

const UnorderedListWithAction = ({ items = [], action = '', onAction = (item) => { } }) => {
    return (
        <>
            {
                !!items?.length ? (
                    <ul>
                        {
                            items?.map((item) => <li key={item}>{item} <Button title={action} onClick={() => onAction(item)} /></li>)
                        }
                    </ul>
                ) : <p>No data found!</p>
            }
        </>
    );
}

export default UnorderedListWithAction;
