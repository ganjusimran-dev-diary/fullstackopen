import { Button, Heading } from '../atoms/index';

const FeedbackInputRow = ({ title = '', options = [], onClick = (e) => { } }) => {

    return (
        <>
            <Heading title={title} />
            {
                options?.map((option) => <Button key={option} title={option} onClick={onClick} />)
            }
        </>
    )
}

export default FeedbackInputRow
