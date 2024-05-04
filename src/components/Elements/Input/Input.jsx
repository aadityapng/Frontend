import React from "react";

const Input = (props) => {
  const { type, placeholder, name } = props;
  return (
    <input
      type={type}
      className="text-sm border rounded w-full py-2 px-3 text-slate-600 placeholder: opacity-60"
      placeholder={placeholder}
      name={name}
    />
  );
};

export default Input;
