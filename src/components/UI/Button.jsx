const Button = ({ children, textOnly, className, ...props }) => {
  let cssClasses = textOnly ? "text-button" : "button";
  //Append new className in case we need it
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};
export default Button;
