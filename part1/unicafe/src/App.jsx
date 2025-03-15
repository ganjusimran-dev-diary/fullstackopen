import { FeedbackInputRow, StatisticContent } from './components/molecules/index';
import useFeedbackHelper from './useFeedbackHelper';

const FEEDBACK_OPTIONS = ['good', 'neutral', 'bad'];
const FEEDBACK_INPUT_TITLE = 'give feedback';
const STATS_TITLE = 'Statistics';

const App = () => {
  const {
    isEmptyFeedback,
    statisticsData,
    onClickFeedback,
  } = useFeedbackHelper();

  return (
    <>
      <FeedbackInputRow
        title={FEEDBACK_INPUT_TITLE}
        options={FEEDBACK_OPTIONS}
        onClick={onClickFeedback}
      />
      <StatisticContent
        title={STATS_TITLE}
        isEmptyFeedback={isEmptyFeedback}
        statisticsData={statisticsData}
      />
    </>
  )
}

export default App
