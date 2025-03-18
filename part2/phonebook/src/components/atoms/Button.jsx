const Button = ({ title = "", onClick = () => {}, disabled = false }) => {
  return (
    <button disabled={!!disabled} type="button" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
