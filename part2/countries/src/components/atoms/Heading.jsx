const Heading = ({ title = '', type = 'primary' }) => {
    return (
        type === 'primary' ? <h1>{title}</h1> : <h2>{title}</h2>
    );
}

export default Heading;
