import { Course } from "../molecules/index";

const CourseCollection = ({ courses = [] }) => {
    return (
        <>
            {
                courses?.map(({ name, parts, id }) => <Course key={`${id}`} name={name} parts={parts} />)
            }
        </>
    )
}

export default CourseCollection
