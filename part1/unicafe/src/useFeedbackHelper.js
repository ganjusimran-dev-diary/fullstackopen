import { useMemo } from "react";
import { useState } from "react";

const useFeedbackHelper = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const onClickFeedback = (type) => {
        switch (type) {
            case 'good':
                setGood(prev => prev + 1);
                break;
            case 'bad':
                setBad(prev => prev + 1);
                break;
            case 'neutral':
            default:
                setNeutral(prev => prev + 1);
                break;
        }
    }

    const isEmptyFeedback = useMemo(() => !good && !bad && !neutral, [good, neutral, bad]);

    const statisticsData = useMemo(() => {
        const totalFeedbacks = good + neutral + bad;
        const averageFeedback = (good - bad) / totalFeedbacks;
        const positiveFeegbackPercent = `${good * 100 / totalFeedbacks} %`;

        return [
            {
                name: 'good',
                value: good
            },
            {
                name: 'neutral',
                value: neutral
            },
            {
                name: 'bad',
                value: bad
            },
            {
                name: 'all',
                value: totalFeedbacks
            },
            {
                name: 'average',
                value: averageFeedback
            },
            ,
            {
                name: 'positive',
                value: positiveFeegbackPercent
            }
        ]

    }, [good, bad, neutral])

    return {
        isEmptyFeedback,
        statisticsData,
        onClickFeedback,
    }
}

export default useFeedbackHelper;