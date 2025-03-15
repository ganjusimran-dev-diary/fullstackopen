import { useMemo } from "react";

const Total = ({ parts = [] }) => {
    const totalValue = useMemo(() => {
        const value = parts?.reduce(
            (accumulator, currentValue) => accumulator + currentValue?.exercises,
            0,
        );
        return `${value} exercise${value != 1 ? 's' : ''}`
    }, [parts]);

    return (
        <strong>total of {totalValue}</strong>
    );
}

export default Total;
