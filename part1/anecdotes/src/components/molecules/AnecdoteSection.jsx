import { useMemo } from "react";
import { Button } from "../atoms/index";

const AnecdoteSection = ({ title = '', text = '', votesForCurrent = 0, actions = [] }) => {
    const votesText = useMemo(() => {
        let tempText = `has ${votesForCurrent} vote`;
        if (votesForCurrent != 1) {
            tempText = `${tempText}s`
        }
        return tempText;
    }, [votesForCurrent]);

    return (
        <>
            <h1>{title}</h1>
            <p>{text}</p>
            {
                actions?.map(({ action, onClick }) => <Button key={action} title={action} onClick={onClick} />)
            }
            <p>{votesText}</p>
        </>
    );
}

export default AnecdoteSection;
