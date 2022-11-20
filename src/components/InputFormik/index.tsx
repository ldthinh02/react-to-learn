import React, { ChangeEvent } from "react";
import { FieldInputProps } from "formik";
interface InputFormik {
  id?: string;
  name?: string;
  field?: FieldInputProps<"">;
  onChange?: {
    (e: React.ChangeEvent<HTMLInputElement>): void;
  };
  classes?: string;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  readonly?: boolean;
  required?: boolean;
  groupClasses?: string;
  data_cy?: string;
  label?: string;
  labelClasses?: string;
  wraperClasses?: string;
  disabled?: boolean;
  isError?: boolean;
  maxValue?: number;
  autoComplete?: string;
  errorIban?: string;
  is_active?: boolean;
}

const InputFormik = ({
  id,
  name,
  type = "text",
  classes,
  placeholder,
  errorMessage,
  onChange,
  value,
  readonly,
  required,
  data_cy,
  label,
  labelClasses,
  wraperClasses,
  disabled,
  isError,
  maxValue,
  autoComplete,
  errorIban,
  is_active,
}: InputFormik) => {
  return (
    <div className={wraperClasses && wraperClasses}>
      {label && (
        <label
          className={`label font-helveticaNeue500 text-xs text-dark mb-1 block uppercase ${labelClasses}`}
        >
          {label}
        </label>
      )}
      <input
        data-cy={data_cy ? data_cy : id}
        id={id}
        type={type}
        name={name}
        placeholder={errorMessage ? errorMessage : placeholder}
        onChange={onChange}
        disabled={disabled}
        value={value}
        readOnly={readonly}
        required={required}
        maxLength={maxValue}
        className={`resize-none focus:outline-none border ${
          isError || errorMessage || errorIban
            ? "border-[#DA0714] placeholder:text-red"
            : "border-mgrey"
        } h-[44px] w-full text-[14px] px-4 text-dark rounded-none ${
          classes || ""
        }`}
        spellCheck="false"
        autoComplete={autoComplete}
      />
      {errorIban && (
        <p className="mt-1 text-[12px] text-[#DA0714]">{errorIban}</p>
      )}
      {errorMessage && is_active && (
        <p className="input-response text-red text-[14px] mt-1">
          {errorMessage !== "Required" ? errorMessage : ""}
        </p>
      )}
    </div>
  );
};

export default InputFormik;
