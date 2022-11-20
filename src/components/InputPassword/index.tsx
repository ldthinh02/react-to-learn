import Image from "next/image";
import { ChangeEvent, useState } from "react";

interface InputPassword {
  label?: string;
  name: string;
  value?: string;
  errorMessage?: string;
  onChange?: {
    (e: ChangeEvent): void;
  };
}

const InputPassword = ({
  label,
  name,
  value,
  errorMessage,
  onChange,
}: InputPassword) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="label font-helveticaNeue500 text-xs text-dark mb-1 block uppercase">
        {label}
      </label>
      <div className="password-wrap relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          id="password-reset"
          onChange={onChange}
          value={value}
          placeholder={errorMessage}
          className={`border ${
            errorMessage
              ? "border-[#DA0714] placeholder:text-red"
              : "border-mgrey"
          } h-12 block outline-0 w-full text-[14px] px-4 text-dark rounded-none pr-8`}
        />
        <span
          className={`password-view-toggle cursor-pointer absolute top-2/4 right-1 -translate-x-2/4 inline-block -mt-2 z-10  ${
            show ? "" : "before:hidden"
          }`}
          onClick={() => setShow(!show)}
        >
          {show ? (
            <Image
              src="/assets/images/view.svg"
              alt=""
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/assets/images/hidden.svg"
              alt=""
              width={16}
              height={16}
            />
          )}
        </span>
      </div>
      {errorMessage && (
        <p className="input-response text-red text-[14px] mt-1">
          {errorMessage !== "Required" ? errorMessage : ""}
        </p>
      )}
    </div>
  );
};

export default InputPassword;
