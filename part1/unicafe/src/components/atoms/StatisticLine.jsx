const StatisticLine = ({ rowTitle = '', rowValue = 0 }) => {
    return (
        <p>{rowTitle} {rowValue}</p>
    );
}

export default StatisticLine;
