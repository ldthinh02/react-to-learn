import React from "react";

interface Button {
  children: string;
  classes?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({ children, onClick, classes, disabled }: Button) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={
      classes
        ? classes
        : `inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg`
    }
  >
    {children}
  </button>
);

export default Button;
