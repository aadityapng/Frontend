import React from "react";

const Button = (props) => {
  const { variant, children = "Button", onClick = () => {} , type ="button" } = props;
  return (
    <button
      className={`h-10 px-6 font-semibold rounded-md ${variant}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
