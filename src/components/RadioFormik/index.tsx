import React from "react";

interface RadioFormik {
  active: boolean;
  classes?: string;
  onChange: (values: RadioInput) => void;
  label: string;
  value?: string;
  name: string;
  disabled?: boolean;
  labelClasses?: string;
}

export const RadioFormik = ({
  active,
  onChange,
  classes,
  label,
  value,
  name,
  disabled = false,
  labelClasses,
}: RadioFormik) => (
  <label className={`custom-radio cursor-pointer block ${labelClasses}`}>
    <input
      type="radio"
      className="hidden"
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
    />
    <span className={`relative block pl-6`}>
      {/* Custom Radio */}
      <span
        className={`absolute top-px left-0 ${
          active ? "bg-black" : "bg-white"
        } border border-dark block w-[12px] h-[12px] rounded-full ${classes}`}
      ></span>
      {active && (
        <span
          className={
            "absolute top-[3px] left-[2px] w-[8px] h-[8px] rounded-full bg-white border-dark block"
          }
        ></span>
      )}
      {/* End of Custom Radio */}
      {label}
    </span>
  </label>
);

export default RadioFormik;
