import { Part } from "../atoms/index";

const Content = ({ parts = [] }) => {
    return (
        <>
            {
                parts?.map(({ name, exercises }) => (
                    <Part key={name} name={name} exercises={exercises} />
                ))
            }
        </>
    );
}

export default Content;
