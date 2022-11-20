import { useState } from "react";

export const useCounter = (initial = 0) => {
  const [counter, setCounter] = useState(initial);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return {
    counter,
    increment,
    decrement,
  };
};
