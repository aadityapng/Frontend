import React, { useState } from "react";

const Counter = ({ initialValue, onValueChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    onValueChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = value > 0 ? value - 1 : 0;
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div className="flex items-center">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="bg-white text-gray-800 py-1 px-3">{value}</span>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default Counter;