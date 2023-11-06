const Input = ({ label, id, ...props }) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} required></input>
    </p>
  );
};

export default Input;
