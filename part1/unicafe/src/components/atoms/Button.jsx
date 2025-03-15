const Button = ({ title = '', onClick = (title) => { } }) => {
    return (
        <button type="button" onClick={() => onClick(title)}>{title}</button>
    );
}

export default Button;
