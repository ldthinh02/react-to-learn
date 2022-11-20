import React, { useEffect, useState } from "react";

interface InputData {
  title: string;
  name: string;
  valueInput?: string;
  onChange: (e: React.ChangeEvent) => void;
  onError?: (value: string, option?: boolean) => void;
  placeholder?: string;
  numberCheck?: number;
  require?: boolean;
  textarea?: boolean;
  disabled?: boolean;
  type?: string;
  click?: boolean;
}

const Input = ({
  title,
  name,
  valueInput,
  placeholder,
  onChange,
  onError,
  numberCheck,
  require,
  textarea,
  disabled,
  type,
  click,
}: InputData) => {
  const [value, setValue] = useState<string>(valueInput ? valueInput : "");

  useEffect(() => {
    if (onError) {
      if (!value.replace(/\s/g, "")) setValue("");
      if (!value && require) onError(name);
      else onError(name, true);
    }
  }, [value]);

  return (
    <div className="w-full">
      <label className="w-full text-[14px] uppercase">
        {title}
        {require ? "*" : ""}
      </label>

      <div
        className={`${
          disabled ? "pointer-events-none bg-[#EFEFEF]" : ""
        } w-full h-min-[48px] mt-[12px] relative p-[11px] border ${
          click && !value && require ? "border-[#DA0714]" : "border-mgrey"
        }`}
      >
        {textarea ? (
          <textarea
            className={`w-[96%] sm:w-[93%] h-min-[30px] text-[14px] resize-none focus:outline-none ml-[5px] ${
              click && !value && require ? "placeholder:text-red" : ""
            }`}
            name={name}
            value={value}
            cols={30}
            rows={4}
            placeholder={click && !value && require ? "Required" : ""}
            spellCheck={false}
            onChange={(e) => {
              setValue(
                numberCheck && e.target.value.length > numberCheck
                  ? e.target.value.slice(0, numberCheck)
                  : e.target.value
              );
              onChange(e);
            }}
          />
        ) : (
          <input
            className={`w-[90%] sm:w-[97%] p-[0px] text-[14px] focus:outline-none ${
              click && !value && require
                ? "placeholder:text-red"
                : "placeholder:text-mgrey"
            }`}
            type={type ? type : "text"}
            name={name}
            value={value}
            placeholder={
              click && !value && require
                ? "Required"
                : placeholder
                ? placeholder
                : ""
            }
            spellCheck={false}
            onChange={(e) => {
              setValue(
                numberCheck && e.target.value.length > numberCheck
                  ? e.target.value.slice(0, numberCheck)
                  : e.target.value
              );
              onChange(e);
            }}
            disabled={disabled}
          />
        )}
        {numberCheck ? (
          <div
            className={`float-right text-[12px] ${
              textarea
                ? "w-[15%] sm:w-[7%] absolute bottom-[9px] right-[3px]"
                : "w-[10%] sm:w-[3%]"
            }`}
          >
            {value.length}/{numberCheck}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
