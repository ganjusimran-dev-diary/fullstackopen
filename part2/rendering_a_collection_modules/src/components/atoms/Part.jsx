const Part = ({ name = '', exercises = 0 }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
}

export default Part;
