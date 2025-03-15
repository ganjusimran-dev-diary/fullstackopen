import { useMemo } from "react";

const Total = ({ parts = [] }) => {
    const totalValue = useMemo(() => {
        return parts?.reduce(
            (accumulator, currentValue) => accumulator + currentValue?.exercises,
            0,
        );
    }, [parts]);

    return (
        <p>Number of exercises {totalValue}</p>
    );
}

export default Total;
