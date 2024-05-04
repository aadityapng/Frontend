import React from "react";

const Button = (props) => {
  const { variant, children = "Button" } = props;
  return (
    <button
      className={`h-10 px-6 font-semibold rounded-md ${variant}`}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;