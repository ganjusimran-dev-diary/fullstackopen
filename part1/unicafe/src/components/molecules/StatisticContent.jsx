import { EmptyFeedback, Heading, StatisticLine } from '../atoms/index';
import StatisticTable from './StatisticTable';

const StatisticContent = ({ title = '', isEmptyFeedback = false, statisticsData = [] }) => {

    return (
        <>
            <Heading title={title} />
            {!!isEmptyFeedback ?
                <EmptyFeedback /> : (
                    <StatisticTable data={statisticsData} />
                )}
        </>
    )
}

export default StatisticContent

/** 
 * THIS IS THE IMPLEMENTATION BEFORE MOVING STAT DATA TO TABLE
<>
    {
        statisticsData?.map(({ name, value }) => <StatisticLine key={name} rowTitle={name} rowValue={value} />)
    }
</>
*/