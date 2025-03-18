const InputText = ({
  label = "",
  placeholder = "",
  value = "",
  onChange = () => {},
  disabled = false,
  type = "text",
}) => {
  return (
    <div>
      {label}:{" "}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default InputText;
