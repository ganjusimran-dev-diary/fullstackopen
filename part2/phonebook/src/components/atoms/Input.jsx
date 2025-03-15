const InputText = ({ label = '', placeholder = '', value = '', onChange = () => { } }) => {
    return (
        <div>
            {label}:  <input placeholder={placeholder} value={value} onChange={onChange} />
        </div>

    );
}

export default InputText;