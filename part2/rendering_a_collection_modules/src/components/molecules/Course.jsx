import { Header } from "../atoms/index";
import { Content, Total } from "../molecules/index"

const Course = ({ name = '', parts = [] }) => {
    return (
        <div>
            <Header title={name} type="secondary" />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course
