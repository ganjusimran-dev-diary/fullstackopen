import { EmptyFeedback, Heading, StatisticLine } from '../atoms/index';

const StatisticContent = ({ title = '', isEmptyFeedback = false, statisticsData = [] }) => {

    return (
        <>
            <Heading title={title} />
            {!!isEmptyFeedback ?
                <EmptyFeedback /> : (
                    <>
                        {
                            statisticsData?.map(({ name, value }) => <StatisticLine key={name} rowTitle={name} rowValue={value} />)
                        }
                    </>
                )}
        </>
    )
}

export default StatisticContent
